import { Check, Copy } from "lucide-react";
import { useState } from "react";

const InviteTab = () => {
  const [copied, setCopied] = useState(false);
  const link = "https://9proxy.com/luckywheel 2025";

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 px-4 py-2.5 border border-[#414b978b] bg-[rgba(255,255,255,0.04)] bg-opacity-40 rounded-xl">
        <img src="/globe.png" alt="" className="size-[24px]" />
        <input
          type="text"
          value={link}
          readOnly
          className="flex-1 bg-transparent text-white outline-none text-sm"
        />
        <button
          onClick={handleCopy}
          className="p-2 hover:scale-90 rounded-lg transition-all cursor-pointer"
        >
          {copied ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <Copy size={18} className="text-gray-300" />
          )}
        </button>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-3 text-base">
          How to Invite Friends to my custom Wheel of Fortune?
        </h3>
        <p className="text-gray-300 leading-relaxed text-sm">
          Click the "Copy" icon and send your link to friends so they can spin
          the lucky wheel and unlock rewards for you both.
        </p>
      </div>
    </div>
  );
};

export default InviteTab;
