import { twMerge } from "tailwind-merge";

const rewards = [
  {
    id: 1,
    icon: <img src="/sad-face-blue.png" alt="" className=" size-[24px]" />,
    title: "GOOD LUCK",
    description: "No prize this time, but your next spin could be the winner!",
  },
  {
    id: 2,
    icon: <img src="/gift-200ips.png" alt="" className=" w-[25px] h-[28px]" />,
    title: "Free 200 IPS",
    description: "Get a 200 residential IP bonus for your next buy.",
  },
  {
    id: 3,
    icon: (
      <img src="/cloud-computing.png" alt="" className=" w-[28px] h-[28px]" />
    ),
    title: "FREE 20 GB",
    description: "Get 20 GB of proxy bandwidth with your next purchase.",
  },

  {
    id: 7,
    icon: <img src="/coupon20.png" alt="" className=" w-[28px] h-[28px]" />,
    title: "SALE 20% OFF",
    description: "Save 20% on your next purchase use our coupon code",
  },
  {
    id: 4,
    icon: <img src="/coupon30.png" alt="" className=" w-[28px] h-[28px]" />,
    title: "SALE 30% OFF",
    description: "Save 30% on your entire next order - Black Friday exclusive.",
  },
  {
    id: 5,
    icon: <img src="/coupon25.png" alt="" className=" w-[28px] h-[28px]" />,
    title: "EXTRA 25%",
    description: "Get +25% IPs or GB on any future package.",
  },
  {
    id: 6,
    icon: <img src="/coupon50.png" alt="" className=" w-[28px] h-[28px]" />,
    title: "EXTRA 50%",
    description: "Jackpot! Get 50% more IPs or GBs on your next purchase.",
    isHighlight: true,
  },
];

const EventDetailsTab = () => (
  <div className="   space-y-2   ">
    {rewards.map((reward, index) => (
      <div
        key={reward.id}
        className={twMerge(
          "flex items-center   text-white  h-[68px] border border-[#414b978b] rounded-xl",
          index == 0 && "rounded-t-[16px]",
          index == rewards.length - 1 && "rounded-b-[16px]",
          reward?.isHighlight && "gradient-border border-none"
        )}
        style={{
          backgroundColor:
            index % 2 === 0
              ? "rgba(255,255,255,0.04)" // 4%
              : "rgba(255,255,255,0.02)", // 2%
        }}
      >
        <div className="w-full max-w-[155px] flex items-center gap-x-3 pl-5">
          {reward.icon}
          <h3
            className={twMerge(
              "font-semibold text-xs ",
              reward.isHighlight && "text-[#FFFF00]"
            )}
          >
            {reward.title}
          </h3>
        </div>
        <div className="flex-1 flex items-center h-full self-stretch min-w-0  border-l border-[rgba(255,255,255,0.04)] px-6">
          <p
            className={twMerge(
              "text-sm  leading-relaxed",
              reward.isHighlight &&
                "text-transparent bg-clip-text bg-gradient-to-r from-[#FFFF00] to-[#F9572D]"
            )}
          >
            {reward.description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default EventDetailsTab;
