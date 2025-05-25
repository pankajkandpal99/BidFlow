import React from "react";

const UserStats: React.FC = () => {
  return (
    <div className="mt-10 flex items-center gap-4">
      <div className="flex -space-x-2">
        {[1, 2, 3, 4].map((img) => (
          <div key={img} className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6FFFB4]/30 to-[#3694FF]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
            <img
              src={`https://i.pravatar.cc/40?img=${img}`}
              className="w-8 h-8 rounded-full border-2 border-[#121a2a] relative"
              alt="User"
            />
          </div>
        ))}
      </div>
      <div className="text-sm">
        <span className="text-[#94a3b8]">Join</span>{" "}
        <span className="font-bold text-white">10,000+</span>{" "}
        <span className="text-[#94a3b8]">players today</span>
      </div>
    </div>
  );
};

export default UserStats;
