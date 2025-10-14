import { useRef, useState, type HTMLAttributes } from "react";
import Confetti from 'react-confetti';
import CustomCursor from "./components/CustomCursor";
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
      style={{
        cursor: 'inherit'
      }}
      className=""
    >
      <img src="/spin.png" alt="Spin Button" className="size-[96px] rounded-full" />
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
        <div className="flex flex-col items-center justify-end w-full mt-5">
          <img src="/gift-200ips.png" alt="Gift 200 IPS" className="w-[33px] h-[40px] object-cover" />
          <div className="font-bold text-black  text-wrap text-xs">
            <p className="">Free </p>
            <p>200 IPs</p>
          </div>
        </div>
      ),
      key: "free_200_ips",
      value: "Free 200 IPs",
      probability: 0.08,
      nearMissEffect: {
        targetDirection: 'before',
        proximity: 0.05,
        chance: 1,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center justify-end w-full mt-5">
          <img src="/cloud-computing.png" alt="Gift 200 IPS" className="w-[44px] h-[34px] object-cover" />
          <div className="font-bold text-black  text-wrap text-xs">
            <p className="">Free </p>
            <p>20 GBs</p>
          </div>
        </div>
      ),
      key: "free_20_gbs",
      value: "Free 20 GBs",
      probability: 0.08,
      nearMissEffect: {
        targetDirection: 'before',
        proximity: 0.05,
        chance: 1,
      },
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center justify-end w-full mt-5">
          <img src="/coupon30.png" alt="Gift 200 IPS" className="w-[36px] h-[33px] object-cover" />
          <div className="font-bold text-black  text-wrap text-xs">
            <p className="">Sale </p>
            <p>30% OFF</p>
          </div>
        </div>
      ),
      key: "sale_30_off",
      value: "Sale 30% OFF",
      probability: 0.1,
      nearMissEffect: {
        targetDirection: 'before',
        proximity: 0.05,
        chance: 1,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center justify-center w-full mt-10">
          <img src="/sad-face.png" alt="Gift 200 IPS" className="w-[39px] h-[39px] object-cover" />

        </div>
      ),
      key: "sad_face",
      value: "Sad Face",
      probability: 0.5,
      nearMissEffect: {
        targetDirection: 'before',
        proximity: 0.05,
        chance: 1,
      },
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center justify-end w-full mt-7">
          <img src="/bonus.png" alt="Gift 200 IPS" className="w-[44px] h-[28px] object-cover" />
          <div className="font-bold text-black  text-wrap text-xs">
            <p className="">Add 25% </p>
            <p>IP or GB</p>
          </div>
        </div>
      ),
      key: "add_25_ip_or_gb",
      value: "Add 25% IP or GB",
      probability: 0.05,
      nearMissEffect: {
        targetDirection: 'before',
        proximity: 0.05,
        chance: 1,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center justify-end w-full mt-4">
          <img src="/badge.png" alt="Gift 200 IPS" className="w-[44px] h-[44px] object-cover" />
          <div className="font-bold text-black  text-wrap text-xs">
            <p className="">Add 50%</p>
            <p>IP or GB</p>
          </div>
        </div>
      ),
      key: "add_50_ip_or_gb",
      value: "Add 50% IP or GB",
      probability: 0.04,
      nearMissEffect: {
        targetDirection: 'before',
        proximity: 0.05,
        chance: 1,
      },
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center justify-end w-full mt-6">
          <img src="/coupon20.png" alt="Gift 200 IPS" className="w-[36px] h-[34px] object-cover" />
          <div className="font-bold text-black  text-wrap text-xs">
            <p className="">Sale</p>
            <p>20% OFF</p>
          </div>
        </div>
      ),
      key: "sale_20_off",
      value: "Sale 20% OFF",
      probability: 0.1,
      nearMissEffect: {
        targetDirection: 'before',
        proximity: 0.05,
        chance: 1,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center justify-center w-full mt-10">
          <img src="/sad-face.png" alt="Gift 200 IPS" className="w-[39px] h-[39px] object-cover" />
        </div>
      ),
      key: "try_again",
      value: "Sad Face",
      probability: 0.05,
      nearMissEffect: {
        targetDirection: 'before',
        proximity: 0.05,
        chance: 1,
      },
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState("fade-in-up");
  const fortuneWheelRef = useRef<WheelOfFortuneRef>(null);
  const [prizeWinnerKey, setPrizeWinnerKey] = useState<string>("");
  console.log("🚀 ~ prizeWinnerKey:", prizeWinnerKey);
  const handleSpinEnd = (prize: WheelOfFortunePrize) => {
    setPrizeWinnerKey(prize.value);
    setShowModal(true);
    setAnimate("fade-in-up");
  };

  const handleCloseModal = () => {
    setAnimate("fade-out-up");
    setTimeout(() => {
      setShowModal(false);
      setPrizeWinnerKey("");
    }, 400);
  };
  return (
    <>
      <div style={{
          backgroundImage: "url('/background.png')", backgroundSize: "cover",
          backgroundPosition: "center",
        }} className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 ">
        {showModal && (
          <div
            onClick={handleCloseModal}
            className={`fixed bg-black/90 z-30 inset-0 flex items-center justify-center cursor-pointer ${animate}`}
          >
            <div
              // onClick={(e) => e.stopPropagation()}
              className="flex flex-col justify-center items-center gap-3 "
            >
              <img src="/gift.png" alt="Gift" className="max-w-md w-full" />
              <div className="text-2xl font-bold text-green-400 flex items-center p-4 bg-white/20 rounded-lg">
                {prizeWinnerKey}
              </div>
            </div>
            <Confetti recycle={false} numberOfPieces={1500} />
          </div>
        )}
        <div style={{
          backgroundImage: "url('/background-container.png')", backgroundSize: "cover",
          backgroundPosition: "center",
        }} className="w-[1200px] h-[860px] relative ">
          <div className="absolute  left-1/2 bottom-[210px] -translate-x-1/2" >
            <img src="/label.png" alt="Background" className="w-full -mb-6 h-full object-cover max-w-[400px] max-h-[184px]" />
            <WheelOfFortune
              className="max-w-[420px]"
              ref={fortuneWheelRef}
              prizes={wheelPrizes}
              wheelPointer={
                <PointerIcon
                  style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))" }}
                  className="w-10 h-[60px] text-white object-cover"
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
                handleSpinEnd(prize);
              }}
              animationDurationInMs={10000}
            />
          </div>
        </div>
      </div>
      <CustomCursor/>
    </>
  );
}

export default App;
