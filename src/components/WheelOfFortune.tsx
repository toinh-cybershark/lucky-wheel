import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useWheelSpin } from "../hooks/useWheelSpin";
import type { WheelOfFortunePrize } from "../types/wheel-of-fortune-prize";
import { generateWheelGradient } from "../utils/wheel-gradient";
const BORDERCIRCLESOFFSETANGLE = 21.5;
export interface WheelOfFortuneRef {
  spin: () => void;
  isSpinning: boolean;
}

export type WheelOfFortuneProps = {
  prizes: WheelOfFortunePrize[];
  wheelPointer: React.ReactNode;
  wheelSpinButton: React.ReactNode;
  onSpinEnd: (prize: WheelOfFortunePrize) => void;
  onSpinStart?: () => void;
  wheelBorderColor?:
  | `rgb(${number}, ${number}, ${number})`
  | `hsl(${number}, ${number}%, ${number}%)`
  | `#${string}`;
  animationDurationInMs?: number;
  wheelRotationsCount?: number;
  className?: string;
};

export const WheelOfFortune = forwardRef<
  WheelOfFortuneRef,
  WheelOfFortuneProps
>((props, ref) => {
  const {
    prizes,
    wheelPointer,
    wheelSpinButton,
    onSpinEnd,
    onSpinStart = () => { },
    wheelBorderColor = "#FFFFFF",
    animationDurationInMs = 5000,
    wheelRotationsCount = 5,
    className,
  } = props;
  const [showDebugLines] = useState(false); // test debug line when development
  const wheelRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const wheelSegmentDegrees =
    prizes.length > 0 ? parseFloat((360 / prizes.length).toFixed(4)) : 0;
  const animationDurationInSeconds = Math.round(animationDurationInMs / 1000);
  const wheelGradient = generateWheelGradient(prizes, wheelSegmentDegrees);
  const {
    isSpinning,
    rotation,
    skipWheelAnimation,
    animationTimingFunction,
    spin,
  } = useWheelSpin(
    prizes,
    onSpinStart,
    onSpinEnd,
    animationDurationInMs,
    wheelRotationsCount,
    wheelRef,
    pointerRef
  );
  const borderCircles = Array.from({ length: 8 });
  useImperativeHandle(ref, () => ({
    isSpinning,
    spin,
  }));
  const isWinnerRevealed = isSpinning
  return (
    <div
      className={twMerge(
        "relative max-w-96 w-full flex flex-col justify-center items-center ",
        className
      )}
    >
      <div className="aspect-square relative w-full overflow-hidden z-10 ">
        {borderCircles.length > 0 && (
          <div className="absolute z-10 top-0 left-0 w-full h-full neon pointer-events-none" style={{
            transform: `rotate(${rotation}deg)`,
            transition: skipWheelAnimation
              ? "none"
              : `transform ${animationDurationInSeconds}s ${animationTimingFunction}`,
          }}>
            {borderCircles.map((_, index) => {
              const rotationAngle = (360 / borderCircles.length) * index + BORDERCIRCLESOFFSETANGLE;
              const animationClass = isWinnerRevealed
                ? "animate-blink-all"
                : index % 2 === 0
                  ? "animate-blink-even-odd"
                  : "animate-blink-even-even "
                ;
              return (
                <div
                  key={`border-circle-${index}`}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                >
                  <div
                    className={twMerge(
                      "absolute top-1.5 left-1/2 -translate-x-1/2 size-3 bg-white rounded-full shadow-lg neon-dot",
                      animationClass
                    )}
                  />
                </div>
              );
            })}
          </div>
        )}
        {wheelPointer && (
          <div
            ref={pointerRef}
            className="absolute z-20 top-[12px] left-[50%] translate-x-[-50%] "
            draggable={false}
          >
            {wheelPointer}
          </div>
        )}
        <div
          ref={wheelRef}
          className={`absolute top-0 left-0 w-full h-full overflow-hidden rounded-[50%] `}
          style={{
            boxShadow:
              "box-shadow: 0 0 20px rgba(0, 0, 0, 0.25), inset 0 0 10px rgba(0, 0, 0, 0.3)",
            borderColor: wheelBorderColor,
            background: wheelGradient,
            transform: `rotate(${rotation}deg)`,
            transition: skipWheelAnimation
              ? "none"
              : `transform ${animationDurationInSeconds}s ${animationTimingFunction}`,
            backgroundImage: "url('/background-lucky-wheel.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {prizes.map((item, index) => (
            <div
              key={item.key}
              className="absolute top-0 left-0 flex justify-center w-full h-full text-center origin-center"
              style={{
                transform: `rotate(${wheelSegmentDegrees * index + wheelSegmentDegrees / 2
                  }deg)`,
              }}
            >
              <div
                style={{
                  rotate:
                    item.displayOrientation === "horizontal"
                      ? "270deg"
                      : "0deg",
                  top: item.displayOrientation === "horizontal" ? "15%" : "10%",
                }}
                className="text-ellipsis absolute overflow-hidden"
              >
                {item.prize}
              </div>
            </div>
          ))}
          {showDebugLines &&
            prizes.map((_, index) => (
              <div
                key={`debug-line-${index}`}
                className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 w-0.5 bg-red-500 origin-bottom"
                style={{
                  transform: `rotate(${wheelSegmentDegrees * index}deg)`,
                }}
              />
            ))}
        </div>
        {wheelSpinButton && (
          <div className={twMerge("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", isSpinning && 'pointer-events-none saturate-20')}>
            {wheelSpinButton}
          </div>
        )}

      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+200px)] h-[calc(100%+200px)] z-0 overflow-visible pointer-events-none ">
        <img
          src="/sun-light.png"
          className="w-full h-full object-contain animate-spin-reverse origin-center"
        />
      </div>
    </div>
  );
});

WheelOfFortune.displayName = "WheelOfFortune";
