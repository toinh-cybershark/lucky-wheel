import { useRef, useState, type HTMLAttributes } from "react";
import Confetti from "react-confetti";
import CustomCursor from "./components/CustomCursor";
import {
  WheelOfFortune,
  type WheelOfFortuneRef,
} from "./components/WheelOfFortune";
import type { WheelOfFortunePrize } from "./types/wheel-of-fortune-prize";
type SpinButtonProps = React.ComponentProps<"button">;
function SpinButton({ disabled, ...props }: SpinButtonProps) {
  return (
    <button
      {...props}
      style={{
        cursor: "inherit",
      }}
      className=""
    >
      <img
        src={disabled ? "/spin-disabled.png" : "/spin.png"}
        alt="Spin Button"
        className="size-[96px] rounded-full "
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
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
        <div className="flex flex-col-reverse items-center justify-end w-full gap-[5px] ">
          <img
            src="/extra100.png"
            alt="Gift 200 IPS"
            className="w-[33px] h-[36px] "
          />
          <div className="font-bold  text-wrap text-xs text-[#0A3AA2]">
            <p className="">EXTRA </p>
            <p>100%</p>
          </div>
        </div>
      ),
      key: "extra100",
      value: "Extra 100%",
      probability: 0.02,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.1,
        chance: 0.7,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col-reverse items-center justify-end w-full gap-[5px] ">
          <img
            src="/200ips.png"
            alt="Gift 200 IPS"
            className="w-[31px] h-[36px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#0A3AA2]">
            <p className="">Free </p>
            <p>200 IPs</p>
          </div>
        </div>
      ),
      key: "free_200_ips",
      value: "Free 200 IPs",
      probability: 0.2,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.35,
        chance: 0.6,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col-reverse items-center justify-center w-full gap-[5px]">
          <img
            src="/20gbs.png"
            alt="Gift 200 IPS"
            className="w-[38px] h-[27px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#FF7B00]">
            <p className="">Free</p>
            <p>20 GBs</p>
          </div>
        </div>
      ),
      key: "free_20_gbs",
      value: "Free 20 GBs",
      probability: 0.2,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col-reverse items-center justify-end w-full gap-[5px] ">
          <img
            src="/coupon20.png"
            alt="Gift 200 IPS"
            className="w-[38px] h-[27px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#0A3AA2]">
            <p className="">Sale </p>
            <p>20% OFF</p>
          </div>
        </div>
      ),
      key: "sale_20_off",
      value: "Sale 20% OFF",
      probability: 0.12,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 0.5,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col-reverse items-center justify-center w-full gap-[5px]">
          <img
            src="/1000ips.png"
            alt="Gift 200 IPS"
            className="w-[31px] h-[36px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#FF7B00]">
            <p className="">Free</p>
            <p>1000 IPs</p>
          </div>
        </div>
      ),
      key: "free1000i_ps",
      value: "Free 1000 IPs",
      probability: 0.1,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 1,
      },
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col-reverse items-center justify-end w-full gap-[5px] ">
          <img
            src="/coupon25.png"
            alt="Gift 200 IPS"
            className="w-[35px] h-[35px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#0A3AA2]">
            <p className="">Add 25% </p>
            <p> IP or GB</p>
          </div>
        </div>
      ),
      key: "add_25_ip_or_gb",
      value: "Add 25% IP or GB",
      probability: 0.15,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.5,
        chance: 0.8,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col-reverse items-center justify-end w-full gap-[5px] ">
          <img
            src="/coupon50.png"
            alt="Gift 200 IPS"
            className="w-[35px] h-[35px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#FF7B00]">
            <p className="">ExTRA</p>
            <p>50%</p>
          </div>
        </div>
      ),
      key: "extra_50",
      value: "EXtra 50%",
      probability: 0.03,
      nearMissEffect: {
        targetDirection: "after",
        proximity: 0.1,
        chance: 0.8,
      },
    },
    {
      color: "#fc9ebe",
      prize: (
        <div className="flex flex-col-reverse items-center justify-end w-full gap-[5px] ">
          <img
            src="/100gbs.png"
            alt="Gift 200 IPS"
            className="w-[38px] h-[27px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#0A3AA2]">
            <p className="">Free</p>
            <p>100 GBs</p>
          </div>
        </div>
      ),
      key: "free_100_gbs",
      value: "Free 100 GBs",
      probability: 0.1,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.2,
        chance: 0.75,
      },
    },
    {
      color: "#feeef6",
      prize: (
        <div className="flex flex-col-reverse items-center justify-center w-full gap-[5px]">
          <img
            src="/coupon30.png"
            alt="Gift 200 IPS"
            className="w-[31px] h-[29px] object-cover"
          />
          <div className="font-bold  text-wrap text-xs text-[#FF7B00]">
            <p className="">Sale</p>
            <p>30% OFF</p>
          </div>
        </div>
      ),
      key: "sale_30_off",
      value: "Sale 30% OFF",
      probability: 0.08,
      nearMissEffect: {
        targetDirection: "before",
        proximity: 0.8,
        chance: 0.1,
      },
    },
  ];
  const total = wheelPrizes.reduce((prev, cur) => {
    return (prev += Number(cur.probability));
  }, 0);
  console.log("🚀 ~ App ~ total:", total);
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
        <CustomCursor>
          <div
            className="w-[1200px] h-[860px] min-h-0 overflow-y-auto rounded-[16px] select-none"
            style={{
              backgroundColor: "#030736",
              cursor: "url('/mouse.png') 37 32, auto",
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
                <img
                  src="/label.png"
                  alt="Background"
                  className="w-full -mb-4 ml-2.5 h-full object-cover max-w-[400px] max-h-[242px]"
                />
                <WheelOfFortune
                  className="max-w-[420px] lg:w-[420px] -mb-[21px]"
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
            {/* <div className="max-w-[1000px] w-full mx-auto">
              <ReferralRewardsProgram />
            </div> */}
          </div>
        </CustomCursor>
      </div>
    </>
  );
}

export default App;
