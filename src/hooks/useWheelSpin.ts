import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type RefObject,
} from "react";
import type { WheelOfFortunePrize } from "../types/wheel-of-fortune-prize";
import { getPrizeWinner } from "../utils/get-prize-winner";
import { getRotationFromMatrix } from "../utils/get-rotation-from-matrix";

const SPIN_DIRECTION = -1;
const COLLISION_ANGLE_OFFSET = -10;
const API_WAIT_SPIN_SPEED = 0.3;
const DELAY_AFTER_SPIN = 2000;
const DEFAULT_ENABLE_POINTER_TICK = true;
export function useWheelSpin(
  prizes: WheelOfFortunePrize[],
  onSpinStart: () => void,
  onSpinEnd: (prize: WheelOfFortunePrize) => void,
  animationDurationInMs: number,
  wheelRotationsCount: number,
  wheelRef: RefObject<HTMLDivElement | null>,
  pointerRef: RefObject<HTMLDivElement | null>,

) {
  const [, startTransition] = useTransition();
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [skipWheelAnimation, setSkipWheelAnimation] = useState<boolean>(false);
  const [animationTimingFunction, setAnimationTimingFunction] =
    useState<string>("ease-out");
  const winnerRef = useRef<WheelOfFortunePrize | null>(null);
  const spinStartTimeRef = useRef<number>(0);
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameId = useRef<number>(0);
  const totalRotationRef = useRef<number>(0);
  const previousAngleRef = useRef<number>(0);
  
  // -- THAY ĐỔI #1: Đổi tên biến để dễ hiểu hơn --
  const lastPassedCollisionIndex = useRef<number>(-1);
  
  // -- THAY ĐỔI #2: Tính toán góc giữa các điểm va chạm (gấp đôi số điểm) --
  // Giờ đây mỗi ô sẽ có 2 điểm va chạm: 1 ở cạnh, 1 ở giữa
  const collisionPointAngle = prizes.length > 0 ? 360 / (prizes.length * 2) : 0;

  useEffect(() => {
    tickAudioRef.current = new Audio("/tick.mp3");
    tickAudioRef.current.volume = 0.5;
  }, []);

  const collisionCheckLoop = () => {
    if (!wheelRef.current || !pointerRef.current) {
      animationFrameId.current = requestAnimationFrame(collisionCheckLoop);
      return;
    }

    const currentAngle = getRotationFromMatrix(wheelRef.current);
    let deltaAngle = currentAngle - previousAngleRef.current;
    if (deltaAngle > 180) deltaAngle -= 360;
    else if (deltaAngle < -180) deltaAngle += 360;

    totalRotationRef.current += deltaAngle;
    previousAngleRef.current = currentAngle;

    // -- THAY ĐỔI #3: Cập nhật toàn bộ logic va chạm để sử dụng giá trị mới --
    const offsetRotation =
      Math.abs(totalRotationRef.current) +
      collisionPointAngle / 2 + // Sử dụng góc va chạm mới
      COLLISION_ANGLE_OFFSET;
    const currentCollisionIndex = Math.floor(offsetRotation / collisionPointAngle); // Sử dụng góc va chạm mới

    if (currentCollisionIndex > lastPassedCollisionIndex.current) {
      if (DEFAULT_ENABLE_POINTER_TICK) {
        if (tickAudioRef.current) {
          const sound = tickAudioRef.current.cloneNode() as HTMLAudioElement;
          sound.play().catch((e) => console.error("Audio play failed:", e));
        }
        const pRef = pointerRef.current;
        if (pRef) {
          pRef.classList.remove("pointer-tick-animation");
          void pRef.offsetWidth; // Force reflow
          pRef.classList.add("pointer-tick-animation");
        }
      }
      lastPassedCollisionIndex.current = currentCollisionIndex;
    }
    animationFrameId.current = requestAnimationFrame(collisionCheckLoop);
  };

  useEffect(() => {
    const startFullSpinProcess = async () => {
      if (!isSpinning) return;
      onSpinStart();
      setIsCompleted(false);
      spinStartTimeRef.current = Date.now();
      
      lastPassedCollisionIndex.current = -1;
      
      totalRotationRef.current = 0;
      previousAngleRef.current = getRotationFromMatrix(wheelRef.current!);
      animationFrameId.current = requestAnimationFrame(collisionCheckLoop);
      const maxWaitDurationMs = 100000;
      const degreesPerSecond = API_WAIT_SPIN_SPEED * 360;
      const initialSpinRotation =
        SPIN_DIRECTION * degreesPerSecond * (maxWaitDurationMs / 1000);
      startTransition(() => {
        setAnimationTimingFunction("cubic-bezier(0.4, 0, 0.6, 1)");
        setRotation(initialSpinRotation);
        if (wheelRef.current) {
          wheelRef.current.style.transitionDuration = `${maxWaitDurationMs}ms`;
        }
      });
      const [winnerIndex, prize] = await getPrizeWinner(prizes);
      if (winnerIndex < 0 || !prize) {
        console.error("Không thể xác định giải thưởng từ API!");
        setIsSpinning(false);
        return;
      }
      winnerRef.current = prize;
      const fullRotations = 360 * wheelRotationsCount;
      const wheelSegmentDegrees = 360 / prizes.length;

      let randomOffset;
      const nearMiss = prize.nearMissEffect;
      const shouldUseNearMiss = nearMiss && Math.random() < nearMiss.chance;

      if (shouldUseNearMiss) {
        if (nearMiss.targetDirection === 'before') {
          randomOffset = nearMiss.proximity * wheelSegmentDegrees;
        } else { // targetDirection === 'after'
          randomOffset = wheelSegmentDegrees - (nearMiss.proximity * wheelSegmentDegrees);
        }
      } else {
        const safeZoneMargin = wheelSegmentDegrees * 0.1;
        randomOffset =
          Math.random() * (wheelSegmentDegrees - safeZoneMargin * 2) +
          safeZoneMargin;
      }
      const baseAngle = winnerIndex * wheelSegmentDegrees;
      const targetAngle = baseAngle + randomOffset;
      const finalRotation = -(fullRotations + targetAngle);
      const timeElapsed = Date.now() - spinStartTimeRef.current;
      const remainingTime = Math.max(4000, animationDurationInMs - timeElapsed);
      console.log("remainingTime", remainingTime);
      startTransition(() => {
        setAnimationTimingFunction("cubic-bezier(0.2, 0.6, 0.4, 1)");
        setRotation(finalRotation);
        if (wheelRef.current) {
          wheelRef.current.style.transitionDuration = `${remainingTime}ms`;
        }
      });
      setTimeout(() => {
        setIsSpinning(false);
        if (winnerRef.current) {
          onSpinEnd(winnerRef.current);
          setIsCompleted(true);
        }
      }, remainingTime + DELAY_AFTER_SPIN);
    };

    startFullSpinProcess();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [isSpinning]);

  useEffect(() => {
    if (!isSpinning) {
      cancelAnimationFrame(animationFrameId.current);
      if (DEFAULT_ENABLE_POINTER_TICK) {
        const pRef = pointerRef.current;
        if (pRef) {
          setTimeout(() => pRef.classList.remove("pointer-tick-animation"), 200);
        }
      }
    }
  }, [isSpinning, pointerRef, DEFAULT_ENABLE_POINTER_TICK]);

  const spin = () => {
    if (isSpinning) return;
    setSkipWheelAnimation(true);
    setRotation(0);
    setTimeout(() => {
      if (wheelRef.current) {
        wheelRef.current.style.transitionDuration = "";
      }
      setSkipWheelAnimation(false);
      setIsSpinning(true);
    }, 50);
  };
  return {
    isCompleted,
    isSpinning,
    rotation,
    skipWheelAnimation,
    animationTimingFunction,
    spin,
  };
}