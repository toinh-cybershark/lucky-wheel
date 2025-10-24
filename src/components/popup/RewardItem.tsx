interface RewardItemProps {
  icon: string;
  title: string;
  desc: string;
}

const RewardItem = ({ icon, title, desc }: RewardItemProps) => (
  <div className="flex gap-4 p-4 bg-indigo-800 bg-opacity-40 rounded-xl hover:bg-opacity-60 transition-all">
    <div className="text-3xl flex-shrink-0">{icon}</div>
    <div className="flex-1">
      <h3 className="text-white font-bold mb-1">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default RewardItem;
