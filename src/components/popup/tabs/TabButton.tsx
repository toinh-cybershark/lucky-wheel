import React from "react";

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ icon, label, active, onClick }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex cursor-pointer flex-1 h-10 items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all text-white  ${
      active
        ? "bg-gradient-to-br from-[#1954E9] to-[#1A40FF] border border-[#57E0FF80]"
        : "opacity-45"
    }`}
  >
    {icon}
    <p className="text-nowrap">{label}</p>
  </button>
);

export default TabButton;
