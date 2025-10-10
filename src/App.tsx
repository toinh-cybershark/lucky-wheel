import { useRef, useState, type HTMLAttributes } from "react";
import { Coin, MoneyBag } from "./assets/icons";
import {
  WheelOfFortune,
  type WheelOfFortuneRef,
} from "./components/WheelOfFortune";
import type { WheelOfFortunePrize } from "./types/wheel-of-fortune-prize";
type SpinButtonProps = React.ComponentProps<"button">;
function SpinButton({ ...props }: SpinButtonProps) {
  return (
    <button
      {...props}
      className="group relative p-0 font-mono text-xs font-light uppercase bg-transparent border-none outline-none cursor-pointer w-36"
    >
      {/* Hiệu ứng bóng đổ */}
      <span className="absolute top-0 left-0 w-full h-full bg-[#bb6541] bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[200ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[150ms] group-active:translate-y-px" />

      {/* Viền nút */}
      <span className="absolute top-0 left-0 w-full h-full rounded-lg border-2 border-[#e67e22] bg-[#e67e22]" />

      {/* Nút chính */}
      <div className="relative flex flex-col items-center justify-center py-2 px-4 text-xs rounded-md transform -translate-y-1 bg-gradient-to-b from-[#ffda6a] to-[#ffb52e] gap-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[150ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110 shadow-inner">
        <span
          className="text-xl font-black select-none tracking-wider"
          style={{
            color: "#9e1c0a",
            textShadow: "0px 1px 1px rgba(255, 255, 255, 0.5)",
          }}
        >
          QUAY
        </span>
      </div>
    </button>
  );
}

export function PointerIcon(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <div className="relative">
      <div className="absolute size-3 left-1/2 top-3 -translate-x-1/2 bg-[#f6fadf] rounded-full"></div>
      <img {...props} src="/location.png" alt="Location Lucky Wheel" />
    </div>
  );
}
function App() {
  const wheelPrizes: WheelOfFortunePrize[] = [
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-[#3d3f79]">8000 Xu</span>
          <div className="flex flex-col items-center -space-y-3">
            <div className="flex -space-x-3">
              <Coin width={"28px"} height={"28px"} />
              <Coin width={"28px"} height={"28px"} />
              <Coin width={"28px"} height={"28px"} />
              <Coin width={"28px"} height={"28px"} />
            </div>
            <div className="flex -space-x-3">
              <Coin width={"38px"} height={"38px"} />
              <Coin width={"38px"} height={"38px"} />
            </div>
          </div>
        </div>
      ),
      key: "8000_xu",
      value: "8000 Xu",
      probability: 0.08,
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-[#3d3f79]">6000 Xu</span>
          <Coin width={"48px"} height={"48px"} />
        </div>
      ),
      key: "6000_xu",
      value: "6000 Xu",
      probability: 0.08,
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-[#3d3f79]">4000 Xu</span>
          <div className="flex flex-col items-center -space-y-3">
            <div className="flex -space-x-3">
              <Coin width={"28px"} height={"28px"} />
              <Coin width={"28px"} height={"28px"} />
              <Coin width={"28px"} height={"28px"} />
            </div>
            <div className="flex -space-x-3">
              <Coin width={"38px"} height={"38px"} />
            </div>
          </div>
        </div>
      ),
      key: "4000_xu",
      value: "4000 Xu",
      probability: 0.1,
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-[#3d3f79]">200 Xu</span>
          <Coin width={"48px"} height={"48px"} />
        </div>
      ),
      key: "200_xu",
      value: "200 Xu",
      probability: 0.5,
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-[#3d3f79]">24000 Xu</span>
          <div className="flex flex-col items-center -space-y-5">
            <div className="flex -space-x-3">
              <Coin width={"28px"} height={"28px"} />
              <Coin width={"28px"} height={"28px"} />
              <Coin width={"28px"} height={"28px"} />
              <Coin width={"28px"} height={"28px"} />
              <Coin width={"28px"} height={"28px"} />
            </div>
            <div className="flex -space-x-3">
              <Coin width={"38px"} height={"38px"} />
              <Coin width={"38px"} height={"38px"} />
              <Coin width={"38px"} height={"38px"} />
            </div>
            <Coin width={"48px"} height={"48px"} />
          </div>
        </div>
      ),
      key: "24000_xu",
      value: "24000 Xu",
      probability: 0.05,
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-bold text-[#3d3f79] w-full min-w-0 break-words">
            Hoàn 1.021.021đ
          </p>
          <MoneyBag width={"58px"} height={"58px"} />
        </div>
      ),
      key: "hoan1021021",
      value: "Hoàn 1.021.021",
      probability: 0.04,
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-bold text-[#3d3f79]">400 Xu</p>
          <Coin width={"48px"} height={"48px"} />
        </div>
      ),
      key: "400_xu",
      value: "400 Xu",
      probability: 0.1,
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-bold text-[#3d3f79]">Chúc may mắn lần sau</p>
        </div>
      ),
      key: "try_again",
      value: "Chúc may mắn lần sau",
      probability: 0.05,
    },
  ];

  const fortuneWheelRef = useRef<WheelOfFortuneRef>(null);
  const [prizeWinnerKey, setPrizeWinnerKey] = useState<string>("");
  console.log("🚀 ~ prizeWinnerKey:", prizeWinnerKey);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 py-10">
      <label className="text-2xl font-bold text-red-400 fixed text-nowrap left-1/2 top-5 -translate-x-1/2">
        {prizeWinnerKey && <>Chúc mừng bạn đã nhận được: {prizeWinnerKey}</>}
      </label>
      <WheelOfFortune
        className="max-w-lg"
        ref={fortuneWheelRef}
        prizes={wheelPrizes}
        wheelPointer={
          <PointerIcon
            style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))" }}
            className="size-12 text-white"
          />
        }
        wheelSpinButton={
          <SpinButton
            style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))" }}
            onMouseUp={() => fortuneWheelRef.current?.spin()}
          />
        }
        onSpinStart={() => {
          setPrizeWinnerKey("");
        }}
        onSpinEnd={(prize) => {
          setPrizeWinnerKey(prize.value);
        }}
        animationDurationInMs={10000}
      />
    </div>
  );
}

export default App;
