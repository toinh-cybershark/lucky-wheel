import { useRef, useState, type HTMLAttributes } from "react";
import Confetti from "react-confetti";
import CustomCursor from "./components/CustomCursor";
import ReferralRewardsProgram from "./components/ReferralRewardsProgram";
import {
  WheelOfFortune,
  type WheelOfFortuneRef,
} from "./components/WheelOfFortune";
import type { WheelOfFortunePrize } from "./types/wheel-of-fortune-prize";
import SparkleStars from "./components/SparkleStars";
type SpinButtonProps = React.ComponentProps<"button">;
function SpinButton({ disabled, ...props }: SpinButtonProps) {
  return (
    <button
      {...props}
      style={{
        cursor: "inherit",
      }}
      className="mt-1.5"
    >
      <img
        src={disabled ? "/spin-disabled.png" : "/spin.png"}
        alt="Spin Button"
        className="size-[96px] rounded-full"
      />
    </button>
  );
}

export function PointerIcon(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <div className="relative">
      <img {...props} src="/location.png" alt="Location Lucky Wheel" />
    </div>
  );
}
function App() {
  const wheelPrizes: WheelOfFortunePrize[] = [
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center justify-end w-full gap-[5px] ">
          <img
            src="/gift-200ips.png"
            alt="Gift 200 IPS"
            className="w-[39px] h-[44px] "
          />
          <div className="font-bold  text-wrap text-xs text-[#0A3AA2]">
            <p className="">Free </p>
            <p>200 IPs</p>
          </div>
        </div>
      ),
      key: "free_200_ips",
      value: "Free 200 IPs",
      probability: 0.08,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center justify-end w-full gap-[5px] ">
          <img
            src="/cloud-computing.png"
            alt="Gift 200 IPS"
            className="w-[48px] h-[34px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#FF7B00]">
            <p className="">Free </p>
            <p>20 GBs</p>
          </div>
        </div>
      ),
      key: "free_20_gbs",
      value: "Free 20 GBs",
      probability: 0.08,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center justify-end w-full gap-[5px] ">
          <img
            src="/coupon30.png"
            alt="Gift 200 IPS"
            className="w-[40px] h-[37px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#0A3AA2]">
            <p className="">Sale </p>
            <p>30% OFF</p>
          </div>
        </div>
      ),
      key: "sale_30_off",
      value: "Sale 30% OFF",
      probability: 0.1,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center justify-center w-full ">
          <img
            src="/sad-face-blue.png"
            alt="Gift 200 IPS"
            className="size-10 object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#FF7B00]">
            <p className="">Good</p>
            <p>luck</p>
          </div>
        </div>
      ),
      key: "sad_face",
      value: "Good luck",
      probability: 0.5,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center justify-end w-full gap-[5px] ">
          <img
            src="/coupon25.png"
            alt="Gift 200 IPS"
            className="w-[40px] h-[40px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#0A3AA2]">
            <p className="">ExTRA</p>
            <p> 25%</p>
          </div>
        </div>
      ),
      key: "add_25_ip_or_gb",
      value: "Add 25% IP or GB",
      probability: 0.05,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center justify-end w-full gap-[5px] ">
          <img
            src="/coupon50.png"
            alt="Gift 200 IPS"
            className="w-[40px] h-[40px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#FF7B00]">
            <p className="">ExTRA</p>
            <p>50%</p>
          </div>
        </div>
      ),
      key: "add_50_ip_or_gb",
      value: "Add 50% IP or GB",
      probability: 0.04,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col items-center justify-end w-full gap-[5px] ">
          <img
            src="/coupon20.png"
            alt="Gift 200 IPS"
            className="w-[40px] h-[37px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#0A3AA2]">
            <p className="">Sale</p>
            <p>20% OFF</p>
          </div>
        </div>
      ),
      key: "sale_20_off",
      value: "Sale 20% OFF",
      probability: 0.1,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col items-center justify-center w-full ">
          <img
            src="/sad-face-blue.png"
            alt="Gift 200 IPS"
            className="size-10 object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#FF7B00]">
            <p className="">Good</p>
            <p>luck</p>
          </div>
        </div>
      ),
      key: "try_again",
      value: "Good luck",
      probability: 0.05,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState("fade-in-up");
  const fortuneWheelRef = useRef<WheelOfFortuneRef>(null);
  const [prizeWinnerKey, setPrizeWinnerKey] =
    useState<WheelOfFortunePrize | null>(null);
  console.log("🚀 ~ prizeWinnerKey:", prizeWinnerKey);
  const handleSpinEnd = (prize: WheelOfFortunePrize) => {
    setPrizeWinnerKey(prize);
    setShowModal(true);
    setAnimate("fade-in-up");
  };

  const handleCloseModal = () => {
    setAnimate("fade-out-up");
    setTimeout(() => {
      setShowModal(false);
      setPrizeWinnerKey(null);
    }, 400);
  };
  return (
    <>

      <div
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex flex-col items-center justify-center w-full h-full min-h-screen gap-8 "
      >
        
        {showModal && (
          <div
            onClick={handleCloseModal}
            className={`fixed bg-black/90 z-30 inset-0 flex items-center justify-center cursor-pointer `}
          >
            <div
              // onClick={(e) => e.stopPropagation()}
              className="flex flex-col justify-center items-center gap-3 "
            >
              <div className="relative">
                <div className={`w-[420px] relative ${animate} z-10`}>
                  <img
                    src="/gift.png"
                    alt="Gift"
                    className="max-w-md w-full "
                  />
                  <div className="absolute bottom-[114px] text-2xl font-bold text-white flex items-center  left-1/2 -translate-x-1/2 ">
                    {prizeWinnerKey?.value}
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+200px)] h-[calc(100%+200px)] z-0 overflow-visible pointer-events-none ">
                  <img
                    src="/sun-light.png"
                    className="w-full h-full object-contain animate-spin-reverse origin-center"
                  />
                </div>
              </div>
            </div>
            <Confetti recycle={false} numberOfPieces={1500} />
          </div>
        )}
        <div
          className="w-[1200px] h-[860px] min-h-0 overflow-y-auto rounded-[16px]"
          style={{
            backgroundColor: "#030736",
          }}
        >
          <div
            style={{
              backgroundImage: "url('/background-container.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-full h-[860px] relative "
          >
            <div className="absolute  left-1/2 bottom-[235px] -translate-x-1/2">
            <SparkleStars>
              <img
                src="/label.png"
                alt="Background"
                className="w-full -mb-6 h-full object-cover max-w-[400px] max-h-[184px]"
              />
              </SparkleStars>
              <WheelOfFortune
                className="max-w-[420px]"
                ref={fortuneWheelRef}
                prizes={wheelPrizes}
                wheelPointer={
                  <PointerIcon
                    style={{
                      filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
                    }}
                    className="w-[44px] h-[62px] text-white object-cover"
                  />
                }
                wheelSpinButton={
                  <SpinButton
                    style={{
                      filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))",
                    }}
                    onMouseUp={() => fortuneWheelRef.current?.spin()}
                    disabled={fortuneWheelRef.current?.isSpinning}
                  />
                }
                onSpinStart={() => {
                  setPrizeWinnerKey(null);
                }}
                onSpinEnd={(prize) => {
                  handleSpinEnd(prize);
                }}
                animationDurationInMs={10000}
              />
            </div>
          </div>
          {/* Desc */}
          <div className="max-w-[1000px] w-full mx-auto">
            <ReferralRewardsProgram />
          </div>
        </div>
      </div>
      <CustomCursor />
    </>
  );
}

export default App;
