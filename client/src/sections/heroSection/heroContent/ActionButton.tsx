import React from "react";
import { motion } from "framer-motion";

const ActionButtons: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
        <div className="relative bg-[#6FFFB4] text-[#0a101f] px-8 py-3 rounded-full font-semibold group-hover:bg-[#8FFFCC] transition-all flex items-center gap-2">
          <span>Start Playing</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </motion.button>
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white px-4 py-3 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        <span>How it works</span>
      </a>
    </div>
  );
};

export default ActionButtons;
