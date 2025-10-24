import { twMerge } from "tailwind-merge";

const rewards = [
  {
    id: 1,
    icon: (
      <img
        src="/sad-face-blue.png"
        alt=""
        className="object-cover size-[32px]"
      />
    ),
    title: "GOOD LUCK",
    description:
      "No prize this time but hey, you found 9Proxy! That's real luck!",
  },
  {
    id: 2,
    icon: (
      <img
        src="/gift-200ips.png"
        alt=""
        className="object-cover w-[28px] h-[32px]"
      />
    ),
    title: "FREE 200IPs",
    description:
      "Get 200 free residential IPs to power your browsing and online activities",
  },
  {
    id: 3,
    icon: (
      <img
        src="/cloud-computing.png"
        alt=""
        className="object-cover w-[32px] h-[23px]"
      />
    ),
    title: "FREE 20GBS",
    description:
      "Get 20 GBs of free proxy traffic for browsing, streaming, and exploring",
  },
  {
    id: 4,
    icon: (
      <img
        src="/coupon30.png"
        alt=""
        className="object-cover w-[32px] h-[30px]"
      />
    ),
    title: "SALE 30% OFF",
    description:
      "Save 30% off your entire order with this exclusive Black Friday deal",
  },
  {
    id: 5,
    icon: (
      <img
        src="/coupon25.png"
        alt=""
        className="object-cover w-[32px] h-[32px]"
      />
    ),
    title: "EXTRA 25%",
    description: "Get 25% more IPs or GBs as bonus on any package purchase",
  },
  {
    id: 6,
    icon: (
      <img
        src="/coupon50.png"
        alt=""
        className="object-cover w-[32px] h-[32px]"
      />
    ),
    title: "EXTRA 50%",
    description:
      "Jackpot! Get 50% more IPs or GBs as bonus on any package purchase",
  },
  {
    id: 7,
    icon: (
      <img
        src="/coupon20.png"
        alt=""
        className="object-cover w-[32px] h-[30px]"
      />
    ),
    title: "SALE 20% OFF",
    description:
      "Save 20% on your purchase, discount applied automatically at checkout",
  },
];

const EventDetailsTab = () => (
  <div className=" border border-[#414b97] rounded-2xl  odd:bg-[#2d398f] even:bg-[#243182] [&>div+div]:border-t [&>div+div]:border-[#414b97]">
    {rewards.map((reward, index) => (
      <div
        key={reward.id}
        className={twMerge(
          "flex items-center   text-white  h-[72px] px-6 ",
          index == 0 && "rounded-t-[16px]",
          index == rewards.length - 1 && "rounded-b-[16px]"
        )}
      >
        <div className="w-full max-w-[196px] flex items-center gap-x-4 ">
          {reward.icon}
          <h3 className="font-semibold text-sm mb-1">{reward.title}</h3>
        </div>
        <div className="flex-1 flex items-center h-full self-stretch min-w-0  ">
          <p className="text-sm  leading-relaxed">{reward.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default EventDetailsTab;
