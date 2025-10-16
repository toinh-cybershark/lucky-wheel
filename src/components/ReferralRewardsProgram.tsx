import { twMerge } from "tailwind-merge";

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
    <div className="text-white space-y-12 mb-24">
      {/* Header Section */}
      <div className="text-center space-y-5">
        <h1 className="text-[#F1AE40] text-[22px]  font-semibold">
          Invite Friends Via Your Link
        </h1>

        <div className="flex items-center gap-3 bg-[#111240] rounded-[16px] p-5 border border-[#282b53]">
          <img src="/globe.png" alt="" className="size-[32px]" />
          <input
            type="text"
            value="https://9proxy.com/luckywheet 2025"
            readOnly
            className="flex-1 bg-transparent text-base font-medium  text-white outline-none"
          />
          <button className="p-2 rounded transition-colors">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6665 24.0001H20.2665C19.8722 24.9855 19.1912 25.83 18.3117 26.4243C17.4322 27.0185 16.3946 27.3352 15.3331 27.3334H5.99982C5.29938 27.3336 4.60577 27.1958 3.95861 26.9278C3.31146 26.6598 2.72344 26.267 2.22816 25.7717C1.73287 25.2764 1.34003 24.6884 1.07208 24.0413C0.804123 23.3941 0.666307 22.7005 0.666504 22.0001V11.3334C0.668082 10.0346 1.14269 8.7809 2.00158 7.80668C2.86046 6.83247 4.04481 6.20447 5.33313 6.04012V16.6667C5.33313 20.7067 8.62644 24.0001 12.6665 24.0001ZM23.9998 6.33337H26.8265C26.7445 6.21321 26.6507 6.10155 26.5464 6.00006L21.9998 1.45319C21.9016 1.34938 21.7894 1.25977 21.6665 1.18694V4.00006C21.6694 4.61799 21.9162 5.20977 22.3532 5.64671C22.7901 6.08366 23.3819 6.33043 23.9998 6.33337ZM23.9998 8.33337C22.8512 8.33116 21.7503 7.8739 20.9381 7.06173C20.126 6.24956 19.6687 5.14865 19.6665 4.00006V0.666748H12.6665C11.9661 0.666551 11.2725 0.804366 10.6253 1.07232C9.97813 1.34027 9.39011 1.73311 8.89482 2.2284C8.39953 2.72368 8.00669 3.3117 7.73872 3.95885C7.47076 4.60601 7.33294 5.29962 7.33313 6.00006V16.6667C7.33295 17.3672 7.47078 18.0608 7.73874 18.7079C8.00671 19.3551 8.39955 19.9431 8.89484 20.4384C9.39013 20.9337 9.97815 21.3265 10.6253 21.5945C11.2725 21.8624 11.9661 22.0002 12.6665 22.0001H21.9998C22.7003 22.0002 23.3939 21.8624 24.041 21.5945C24.6882 21.3265 25.2762 20.9337 25.7715 20.4384C26.2667 19.9431 26.6596 19.3551 26.9275 18.7079C27.1955 18.0608 27.3333 17.3672 27.3331 16.6667V8.33337H23.9998Z"
                fill="white"
                fill-opacity="0.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Event Reward Details */}
      <div className="space-y-5">
        <h2 className="text-[#F1AE40] text-center text-[22px]  font-semibold">
          Event Reward Details
        </h2>

        <div className="">
          {rewards.map((reward, index) => (
            <div
              key={reward.id}
              className={twMerge(
                "flex items-center rounded-l-[16px] gap-4 bg-[#111240]   border border-[#282b53] [&+div]:border-t-0  transition-colors",
                index == 0 && "rounded-t-[16px]",
                index == rewards.length - 1 && "rounded-b-[16px]"
              )}
            >
              <div className="w-full max-w-[280px] flex items-center gap-x-4 p-4 border-r border-[#282b53]">
                {reward.icon}
                <h3 className="font-semibold text-base mb-1">{reward.title}</h3>
              </div>
              <div className="flex-1 h-full self-stretch min-w-0  p-4">
                <p className="text-base text-gray-300 leading-relaxed">
                  {reward.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Participation Requirements */}
      <div className="space-y-5">
        <h2 className="text-[#F1AE40] text-center text-[22px]  font-semibold">
          Program Participation Requirements
        </h2>

        <div className="space-y-4">
          {requirements.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between gap-4 bg-[#111240] rounded-lg p-4 border border-[#282b53]"
            >
              <p className="text-base text-gray-200 flex-1">{req.text}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-lg text-gray-300">{req.checkText}</span>
                {req.status === "qualified" ? (
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_167_13977)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 0.5C5.38125 0.5 0 5.88125 0 12.5C0 19.1187 5.38125 24.5 12 24.5C18.6187 24.5 24 19.1187 24 12.5C24 5.88125 18.6187 0.5 12 0.5Z"
                        fill="#4BAE4F"
                      />
                      <path
                        d="M9.68906 17.989C8.15625 16.4562 6.63281 14.9094 5.09531 13.3765C4.92656 13.2078 4.92656 12.9265 5.09531 12.7578L6.8625 10.9906C7.03125 10.8219 7.3125 10.8219 7.48125 10.9906L10.0078 13.5172L16.5047 7.0156C16.6781 6.84685 16.9547 6.84685 17.1281 7.0156L18.9 8.78748C19.0734 8.96091 19.0734 9.23748 18.9 9.40623L10.3078 17.989C10.1391 18.1625 9.8625 18.1625 9.68906 17.989Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_167_13977">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_167_13991)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 0.5C5.38125 0.5 0 5.88125 0 12.5C0 19.1187 5.38125 24.5 12 24.5C18.6187 24.5 24 19.1187 24 12.5C24 5.88125 18.6187 0.5 12 0.5Z"
                        fill="white"
                        fill-opacity="0.2"
                      />
                      <path
                        d="M9.68906 17.9892C8.15625 16.4563 6.63281 14.9095 5.09531 13.3767C4.92656 13.2079 4.92656 12.9267 5.09531 12.7579L6.8625 10.9907C7.03125 10.822 7.3125 10.822 7.48125 10.9907L10.0078 13.5173L16.5047 7.01572C16.6781 6.84697 16.9547 6.84697 17.1281 7.01572L18.9 8.7876C19.0734 8.96104 19.0734 9.2376 18.9 9.40635L10.3078 17.9892C10.1391 18.1626 9.8625 18.1626 9.68906 17.9892Z"
                        fill="white"
                        fill-opacity="0.2"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_167_13991">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
