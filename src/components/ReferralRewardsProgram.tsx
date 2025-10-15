import { CheckCircle } from "lucide-react";

export default function ReferralRewardsProgram() {
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
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
      description: "Lorem Ipsum is simply dummy text of the printing and.",
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
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
      description: "Lorem Ipsum is simply dummy text of the printing and.",
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
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
      description: "Lorem Ipsum is simply dummy text of the printing.",
    },
  ];

  const requirements = [
    {
      id: 1,
      text: "You need to log in to claim your reward.",
      status: "qualified",
      checkText: "Qualified",
    },
    {
      id: 2,
      text: "Verify your email so we can contact you and share exclusive offers.",
      status: "qualified",
      checkText: "Qualified",
    },
    {
      id: 3,
      text: "Limit: one spin per account.",
      status: "not-qualified",
      checkText: "Spin: 0/1",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-[#F1AE40] text-xl font-semibold">
            Invite Friends Via Your Link
          </h1>

          <div className="flex items-center gap-3 bg-[#111240] rounded-lg p-4 border border-[#282b53]">
            <img src="/globe.png" alt="" className="size-[32px]" />
            <input
              type="text"
              value="https://9proxy.com/luckywheet 2025"
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-300 outline-none"
            />
            <button className="p-2 rounded transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Event Reward Details */}
        <div className="space-y-4">
          <h2 className="text-[#F1AE40] text-center text-lg font-semibold">
            Event Reward Details
          </h2>

          <div className="">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center gap-4 bg-[#111240] rounded-lg  border border-[#282b53]  transition-colors"
              >
                <div className="w-full max-w-[280px] flex items-center gap-x-4 p-4">
                  {reward.icon}
                  <h3 className="font-semibold text-sm mb-1">{reward.title}</h3>
                </div>
                <div className="flex-1 min-w-0 border-l border-[#282b53] p-4">
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {reward.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Participation Requirements */}
        <div className="space-y-4">
          <h2 className="text-[#F1AE40] text-center text-lg font-semibold">
            Program Participation Requirements
          </h2>

          <div className="space-y-3">
            {requirements.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between gap-4 bg-[#111240] rounded-lg p-4 border border-[#282b53]"
              >
                <p className="text-sm text-gray-200 flex-1">{req.text}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-300">{req.checkText}</span>
                  {req.status === "qualified" ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
