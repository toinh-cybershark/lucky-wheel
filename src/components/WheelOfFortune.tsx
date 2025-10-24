import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { useWheelSpin } from "../hooks/useWheelSpin";
import type { WheelOfFortunePrize } from "../types/wheel-of-fortune-prize";
import { generateWheelGradient } from "../utils/wheel-gradient";
import SpinButton from "./SpinButton";
import WheelDots from "./WheelDots";
import LuckyWheelInfoModal from "./popup/LuckyWheelInfoModal";
export interface WheelOfFortuneRef {
  spin: () => void;
  isSpinning: boolean;
}

export type WheelOfFortuneProps = {
  prizes: WheelOfFortunePrize[];
  wheelPointer: React.ReactNode;
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
const CHASING_ANIMATION_SPEED_MS = 1300;
const BORDERCIRCLESOFFSETANGLE = 21.5;
export const WheelOfFortune = forwardRef<
  WheelOfFortuneRef,
  WheelOfFortuneProps
>((props, ref) => {
  const {
    prizes,
    wheelPointer,
    onSpinEnd,
    onSpinStart = () => {},
    wheelBorderColor = "#FFFFFF",
    animationDurationInMs = 5000,
    wheelRotationsCount = 5,
    className,
  } = props;
  const [activeDotIndex, setActiveDotIndex] = useState<number | null>(null);
  const [showDebugLines] = useState(false); // test debug line when development
  const rotatingDivRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const wheelSegmentDegrees =
    prizes.length > 0 ? parseFloat((360 / prizes.length).toFixed(4)) : 0;
  const animationDurationInSeconds = Math.round(animationDurationInMs / 1000);
  const wheelGradient = generateWheelGradient(prizes, wheelSegmentDegrees);
  const {
    isCompleted,
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
    rotatingDivRef,
    pointerRef
  );
  const borderCircles = Array.from({ length: 8 });
  useEffect(() => {
    let intervalId: number | undefined;
    if (isSpinning) {
      const speedPerDot = CHASING_ANIMATION_SPEED_MS / borderCircles.length;
      intervalId = setInterval(() => {
        setActiveDotIndex((prevIndex) => {
          if (prevIndex === null || prevIndex <= 0) {
            return borderCircles.length - 1;
          }
          return prevIndex - 1;
        });
      }, speedPerDot);
    } else {
      setActiveDotIndex(null);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isSpinning, borderCircles.length]);
  useImperativeHandle(ref, () => ({
    isSpinning,
    spin,
  }));
  return (
    <div
      className={twMerge(
        "relative max-w-96 w-full flex flex-col justify-center items-center ",
        className
      )}
    >
      <div className="aspect-square relative w-full overflow-hidden z-10 ">
        {borderCircles.length > 0 && (
          <div className="absolute z-10 top-0 left-0 w-full h-full neon pointer-events-none">
            {borderCircles.map((_, index) => {
              const rotationAngle =
                (360 / borderCircles.length) * index + BORDERCIRCLESOFFSETANGLE;
              const isActive = index === activeDotIndex;
              return (
                <div
                  key={`border-circle-${index}`}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                >
                  <div
                    className={twMerge(
                      "absolute top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full shadow-lg neon-dot",
                      isActive && "dot-active",
                      !isSpinning && isCompleted && "animate-blink-all"
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
            className="absolute z-20 top-1.5 left-[50%] translate-x-[-50%] "
            draggable={false}
          >
            {wheelPointer}
          </div>
        )}
        <div
          ref={wheelRef}
          className={`absolute top-0 left-0 w-full h-full overflow-hidden rounded-[50%] flex justify-center items-center`}
          style={{
            boxShadow:
              "box-shadow: 0 0 20px rgba(0, 0, 0, 0.25), inset 0 0 10px rgba(0, 0, 0, 0.3)",
            borderColor: wheelBorderColor,
            background: wheelGradient,
            backgroundImage: "url('/background-lucky-wheel.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            ref={rotatingDivRef}
            className="size-[76%] lucky-wheel"
            style={{
              backgroundImage: "url('/background-spin.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `rotate(${rotation}deg)`,
              transition: skipWheelAnimation
                ? "none"
                : `transform ${animationDurationInSeconds}s ${animationTimingFunction}`,
            }}
          >
            {prizes.map((item, index) => (
              <div
                key={item.key}
                className="absolute top-0 left-0 flex justify-center w-full h-full text-center origin-center"
                style={{
                  transform: `rotate(${
                    wheelSegmentDegrees * index + wheelSegmentDegrees / 2
                  }deg)`,
                }}
              >
                <div
                  style={{
                    rotate:
                      item.displayOrientation === "horizontal"
                        ? "270deg"
                        : "0deg",
                    top:
                      item.displayOrientation === "horizontal" ? "15%" : "3.5%",
                  }}
                  className="text-ellipsis absolute overflow-hidden"
                >
                  {item.prize}
                </div>
              </div>
            ))}
            <WheelDots
              prizeLength={prizes.length}
              wheelSegmentDegrees={wheelSegmentDegrees}
            />
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
        </div>

        <div
          className={twMerge(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            isSpinning && "pointer-events-none"
          )}
        >
          <SpinButton
            style={{
              filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
            }}
            onMouseUp={() => spin()}
            disabled={isSpinning}
          />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+200px)] h-[calc(100%+200px)] z-0 overflow-visible pointer-events-none ">
        <img
          src="/sun-light.png"
          className="w-full h-full object-contain animate-spin-reverse origin-center"
        />
      </div>
      {/* Action Popup Desc */}
      <LuckyWheelInfoModal />
    </div>
  );
});

WheelOfFortune.displayName = "WheelOfFortune";
