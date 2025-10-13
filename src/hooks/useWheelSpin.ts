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
const COLLISION_ANGLE_OFFSET = -20; // Con số tinh chỉnh của bạn được giữ nguyên
const API_WAIT_SPIN_SPEED = 0.3; // Số vòng quay mỗi giây trong khi chờ API
export function useWheelSpin(
  prizes: WheelOfFortunePrize[],
  onSpinStart: () => void,
  onSpinEnd: (prize: WheelOfFortunePrize) => void,
  animationDurationInMs: number,
  wheelRotationsCount: number,
  wheelRef: RefObject<HTMLDivElement | null>,
  pointerRef: RefObject<HTMLDivElement | null>
) {
  const [, startTransition] = useTransition();
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [skipWheelAnimation, setSkipWheelAnimation] = useState<boolean>(false);
  const [animationTimingFunction, setAnimationTimingFunction] =
    useState<string>("ease-out");
  const winnerRef = useRef<WheelOfFortunePrize | null>(null);

  const spinStartTimeRef = useRef<number>(0); // Ref mới để theo dõi thời gian bắt đầu quay
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameId = useRef<number>(0);

  // Các ref để theo dõi góc quay tích lũy
  const totalRotationRef = useRef<number>(0);
  const previousAngleRef = useRef<number>(0);

  const lastPassedPegIndex = useRef<number>(-1);
  const pegAngle = 360 / prizes.length;

  useEffect(() => {
    tickAudioRef.current = new Audio("/tick.mp3");
    tickAudioRef.current.volume = 0.5;
  }, []);

  // HÀM NÀY ĐƯỢC GIỮ NGUYÊN HOÀN TOÀN, VÌ NÓ ĐÃ HOẠT ĐỘNG TỐT
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

    const offsetRotation =
      Math.abs(totalRotationRef.current) +
      pegAngle / 2 +
      COLLISION_ANGLE_OFFSET;
    const currentPegIndex = Math.floor(offsetRotation / pegAngle);

    if (currentPegIndex > lastPassedPegIndex.current) {
      if (tickAudioRef.current) {
        const sound = tickAudioRef.current.cloneNode() as HTMLAudioElement;
        sound.play().catch((e) => console.error("Audio play failed:", e));
      }

      const pRef = pointerRef.current;
      pRef.classList.remove("pointer-tick-animation");
      void pRef.offsetWidth;
      pRef.classList.add("pointer-tick-animation");

      lastPassedPegIndex.current = currentPegIndex;
    }

    animationFrameId.current = requestAnimationFrame(collisionCheckLoop);
  };

  // LOGIC QUAY CHÍNH ĐƯỢC NÂNG CẤP LÊN "HAI GIAI ĐOẠN"
  useEffect(() => {
    const startFullSpinProcess = async () => {
      if (!isSpinning) return;

      // === GIAI ĐOẠN 1: BÁNH XE QUAY NGAY LẬP TỨC ===
      onSpinStart();
      spinStartTimeRef.current = Date.now();

      // Reset trạng thái hiệu ứng va chạm
      lastPassedPegIndex.current = -1;
      totalRotationRef.current = 0;
      previousAngleRef.current = getRotationFromMatrix(wheelRef.current!);
      animationFrameId.current = requestAnimationFrame(collisionCheckLoop);

      // Bắt đầu một vòng quay "ảo" dài với tốc độ không đổi (linear)
      const maxWaitDurationMs = 100000; // Thời gian chờ tối đa: 100 giây
      const degreesPerSecond = API_WAIT_SPIN_SPEED * 360;
      const initialSpinRotation = SPIN_DIRECTION * degreesPerSecond * (maxWaitDurationMs / 1000);

      startTransition(() => {
        setAnimationTimingFunction("cubic-bezier(0.4, 0, 0.6, 1)");
        setRotation(initialSpinRotation);
        if (wheelRef.current) {
          wheelRef.current.style.transitionDuration = `${maxWaitDurationMs}ms`;
        }
      });

      // === GỌI API SONG SONG KHI BÁNH XE ĐANG QUAY ===
      // Giả sử bạn đã có hàm `getPrizeWinner` như hướng dẫn ở câu trả lời trước
      const [winnerIndex, prize] = await getPrizeWinner(prizes);

      if (winnerIndex < 0 || !prize) {
        console.error("Không thể xác định giải thưởng từ API!");
        setIsSpinning(false);
        return;
      }
      winnerRef.current = prize;

      // === GIAI ĐOẠN 2: TÍNH ĐIỂM DỪNG VÀ BẮT ĐẦU GIẢM TỐC ===
      const fullRotations = 360 * wheelRotationsCount;
      const wheelSegmentDegrees = 360 / prizes.length;
      const safeZoneMargin = wheelSegmentDegrees * 0.1;
      const randomOffset =
        Math.random() * (wheelSegmentDegrees - safeZoneMargin * 2) +
        safeZoneMargin;
      const baseAngle = winnerIndex * wheelSegmentDegrees;
      const targetAngle = baseAngle + randomOffset;
      const finalRotation = -(fullRotations + targetAngle);

      // Tính toán thời gian còn lại để animation giảm tốc trông tự nhiên
      const timeElapsed = Date.now() - spinStartTimeRef.current;
      const remainingTime = Math.max(4000, animationDurationInMs - timeElapsed); // Ít nhất 4s để giảm tốc

      startTransition(() => {
        setAnimationTimingFunction("cubic-bezier(0.2, 0.6, 0.4, 1)");
        setRotation(finalRotation);
        if (wheelRef.current) {
          wheelRef.current.style.transitionDuration = `${remainingTime}ms`;
        }
      });

      // Dọn dẹp sau khi animation giảm tốc kết thúc
      setTimeout(() => {
        setIsSpinning(false);
        if (winnerRef.current) {
          onSpinEnd(winnerRef.current);
        }
      }, remainingTime);
    };

    startFullSpinProcess();

    return () => {
      // Hàm cleanup chính (ít được dùng vì logic nằm trong isSpinning)
      cancelAnimationFrame(animationFrameId.current);
    };
    // Chỉ phụ thuộc vào `isSpinning` để trigger toàn bộ quá trình
  }, [isSpinning]);

  useEffect(() => {
    if (!isSpinning) {
      cancelAnimationFrame(animationFrameId.current);
      const pRef = pointerRef.current;
      if (pRef) {
        setTimeout(() => pRef.classList.remove("pointer-tick-animation"), 200);
      }
    }
  }, [isSpinning, pointerRef]);

  const spin = () => {
    if (isSpinning) return;
    setSkipWheelAnimation(true);
    setRotation(0);

    setTimeout(() => {
      // Reset lại transition duration trước khi bắt đầu quay
      if (wheelRef.current) {
        wheelRef.current.style.transitionDuration = ""; // Xóa style inline để CSS class có hiệu lực
      }
      setSkipWheelAnimation(false);
      setIsSpinning(true);
    }, 50);
  };

  return {
    isSpinning,
    rotation,
    skipWheelAnimation,
    animationTimingFunction,
    spin,
  };
}
