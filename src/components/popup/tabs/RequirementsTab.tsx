const RequirementsTab = () => (
  <div className="space-y-4 text-white border border-[#414b97] rounded-2xl p-4 bg-[#253074]">
    {[
      "Applies only to Pricing packages (Reseller packages excluded)",
      "Coupons are valid until Dec 31, 2025",
      "One-time use, not stackable with other codes",
    ].map((text, idx) => (
      <div key={idx} className="flex items-start gap-3">
        <div className="text-green-400 mt-1">✓</div>
        <p>{text}</p>
      </div>
    ))}
  </div>
);

export default RequirementsTab;
