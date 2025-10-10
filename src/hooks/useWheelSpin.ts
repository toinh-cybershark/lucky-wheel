import { useEffect, useRef, useState, useTransition } from "react";
import type { WheelOfFortunePrize } from "../types/wheel-of-fortune-prize";
import {
  getFixedPrizeWinner,
  getWeightedPrizeWinner,
} from "../utils/get-prize-winner";

export function useWheelSpin(
  prizes: WheelOfFortunePrize[],
  onSpinStart: () => void,
  onSpinEnd: (prize: WheelOfFortunePrize) => void,
  animationDurationInMs: number,
  wheelRotationsCount: number,
) {
  const [, startTransition] = useTransition();
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isInitialSpin, setIsInitialSpin] = useState<boolean>(false); // status cho giai đoạn quay ban đầu
  const [rotation, setRotation] = useState<number>(0);
  const [skipWheelAnimation, setSkipWheelAnimation] = useState<boolean>(false);
  const [animationTimingFunction, setAnimationTimingFunction] = useState<string>("linear"); // default là linear cho quay ban đầu
  const winnerRef = useRef<WheelOfFortunePrize | null>(null);
  const startTimeRef = useRef<number | null>(null); // Theo dõi thời điểm bắt đầu quay
  const initialSpinSpeed = 360 * 2; // Tốc độ quay ban đầu: 2 vòng mỗi giây

  useEffect(() => {
    let timeout: number;
    if (isSpinning) {
      // Bắt đầu animation quay ban đầu
      setIsInitialSpin(true);
      setSkipWheelAnimation(true);
      setRotation(0);
      startTimeRef.current = Date.now();
      startTransition(() => {
        setSkipWheelAnimation(false);
        setAnimationTimingFunction("linear");
        setRotation(-(initialSpinSpeed * (animationDurationInMs / 1000)));
      });

      // lấy thông tin và tính toán tham số quay cuối cùng
      calculateSpinParameters().then(() => {
        timeout = setTimeout(() => {
          setIsSpinning(false);
          setIsInitialSpin(false);
          if (winnerRef.current) {
            onSpinEnd(winnerRef.current);
          }
        }, animationDurationInMs);
        if (onSpinStart) onSpinStart();
      });
    }
    return () => {
      clearTimeout(timeout); 
    };
  }, [isSpinning]);

  const spin = () => {
    if (isSpinning) return; // Không cho phép quay nếu đang quay
    setIsSpinning(true);
  };

  const getPrizeWinner = async (): Promise<[number, WheelOfFortunePrize | null]> => {
    try {
      const data = await (await fetch(`http://localhost:3000/lucky-wheel`)).json();
      console.log("data", data);
      const valueWinner = data.valueWinner;
      if (valueWinner === "weighted") return getWeightedPrizeWinner(prizes); // Lấy người thắng dựa trên trọng số
      return getFixedPrizeWinner(valueWinner, prizes); // Lấy người thắng cố định
    } catch (error) {
      console.error("Lỗi khi tính toán người thắng:", error);
      return [-1, null];
    }
  };

  const calculateSpinParameters = async () => {
    const [winnerIndex, prize] = await getPrizeWinner();
    winnerRef.current = prize;

    // Tính thời gian đã trôi qua kể từ khi bắt đầu quay
    const elapsedTime = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;
    // Tính góc quay hiện tại dựa trên tốc độ quay ban đầu
    const currentRotation = -(elapsedTime * initialSpinSpeed) % 360;

    const fullRotations = 360 * wheelRotationsCount;
    const wheelSegmentDegrees =
      prizes.length > 0 ? parseFloat((360 / prizes.length).toFixed(4)) : 0; // Tính độ rộng của mỗi đoạn vòng quay

    // Hiệu ứng gần trúng
    const nearMissEffect = shouldApplyNearMissEffect();
    const safeZoneMargin = wheelSegmentDegrees * (nearMissEffect ? 0.05 : 0.1);

    const randomOffset = nearMissEffect
      ? safeZoneMargin + Math.random() * safeZoneMargin
      : Math.random() * (wheelSegmentDegrees - safeZoneMargin * 2) + safeZoneMargin;

    const baseAngle = winnerIndex * wheelSegmentDegrees;
    const targetAngle = baseAngle + randomOffset;

    // Điều chỉnh góc quay cuối để tiếp tục từ góc hiện tại
    const normalizedCurrentRotation = currentRotation % 360;
    const additionalRotations = fullRotations + (normalizedCurrentRotation < 0 ? normalizedCurrentRotation + 360 : normalizedCurrentRotation);
    const finalRotation = -(additionalRotations + targetAngle);

    // Tính thời gian animation còn lại dựa trên thời gian đã trôi qua
    const remainingDuration = Math.max(0, animationDurationInMs - elapsedTime * 1000);

    startTransition(() => {
      setAnimationTimingFunction("cubic-bezier(0, 0, 0.05, 1.0)"); // Chuyển sang hiệu ứng giảm tốc mạnh
      setRotation(finalRotation);
      setIsInitialSpin(false);
    });

    // Trả về thời gian còn lại cho animation (tùy chọn, để điều chỉnh CSS)
    return remainingDuration;
  };

  const shouldApplyNearMissEffect = (): boolean => {
    //  hiệu ứng gần trúng ngẫu nhiên (30% cơ hội)
    return Math.random() < 0.3;
  };

  return {
    isSpinning,
    isInitialSpin,
    rotation,
    skipWheelAnimation,
    animationTimingFunction,
    spin,
  };
}