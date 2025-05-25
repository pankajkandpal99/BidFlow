import React from "react";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButton";
import UserStats from "./UserStats";

const HeroContent: React.FC = () => {
  return (
    <div className="text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Play & Win <br />
          <span className="text-primary drop-shadow-lg">Real Cash</span>
        </h1>
        <p className="text-xl text-secondary mb-8 max-w-lg">
          Join India's most trusted skill-based gaming platform. Use your skills
          to win big and withdraw instantly!
        </p>
        <ActionButtons />
        <UserStats />
      </motion.div>
    </div>
  );
};

export default HeroContent;
