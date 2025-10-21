export default function RequirementsNote() {
  return (
    <div className="text-white space-y-12 mb-24 ">
      <div className="flex items-center gap-2 mb-6 justify-center">
        <img src="/bell.png" alt="" className="w-[32px] " />
        <h2 className="text-[#F1AE40] text-center text-[22px]">
          Requirements & Note
        </h2>
      </div>

      <div className="bg-[#111240] rounded-lg p-4 border border-[#282b53]">
        <div className="space-y-4 mb-6 ">
          <div className="text-slate-200 text-sm leading-relaxed">
            - Applies only to Pricing packages (Reseller packages excluded)
          </div>
          <div className="text-slate-200 text-sm leading-relaxed">
            - Coupons are valid until Dec 31, 2025
          </div>
          <div className="text-slate-200 text-sm leading-relaxed">
            - One-time use, not stackable with other codes
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden">
          <div className="bg-[url('/bg-button-requirements.png')] bg-center bg-no-repeat bg-cover py-5 px-[46px]">
            <p className="text-white text-base text-center leading-relaxed font-medium">
              Spend $500+ during BF week (Nov 26 – Dec 2, GMT+0) to unlock a
              special spin with premium rewards - visible only in your
              Dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
