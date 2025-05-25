import { motion } from "framer-motion";
import TournamentCard from "../../components/Home/tournamentsCard/TournamentCard";
import { useEffect, useState } from "react";

const LiveTournaments = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-12 sm:py-8 md:py-12 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative text-center mb-10 md:mb-12 lg:mb-14">
          {!isMobile && (
            <div className="inline-flex items-center justify-center absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="h-2 w-2 bg-[#FF6FE5] rounded-full animate-pulse"></div>
              <span className="text-[#FF6FE5] font-medium text-sm sm:text-base ml-2">
                Live Now
              </span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Live Tournaments
          </h2>
          <p className="text-[#94a3b8] text-sm sm:text-base max-w-xl mx-auto">
            Compete with other players and win big prizes
          </p>
        </div>

        {isMobile && (
          <div className="flex items-center justify-center my-2">
            <div className="h-2 w-2 bg-[#FF6FE5] rounded-full animate-pulse"></div>
            <span className="text-[#FF6FE5] font-medium text-sm sm:text-base ml-2">
              Live Now
            </span>
          </div>
        )}

        {isMobile ? (
          <div className="relative">
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex space-x-4 w-max px-4">
                <motion.div
                  className="w-64 flex-shrink-0"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <TournamentCard />
                </motion.div>
                <motion.div
                  className="w-64 flex-shrink-0"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <TournamentCard />
                </motion.div>
                <motion.div
                  className="w-64 flex-shrink-0"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <TournamentCard />
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />
          </div>
        )}

        <div className="flex justify-center mt-10 md:mt-12 lg:mt-14">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px -3px rgba(255, 111, 229, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="relative bg-gradient-to-r from-[#FF6FE5]/10 to-[#6F6FFB]/10 hover:from-[#FF6FE5]/20 hover:to-[#6F6FFB]/20 border border-[#1e293b] hover:border-[#FF6FE5]/30 px-6 py-3 rounded-lg font-medium transition-all text-white flex items-center gap-2 text-sm sm:text-base">
              <span>View All Live Tournaments</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default LiveTournaments;

// import { motion } from "framer-motion";
// import TournamentCard from "../../components/Home/tournamentsCard/TournamentCard";

// const LiveTournaments = () => {
//   return (
//     <section className="py-12 sm:py-16 md:py-20 relative">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="relative text-center mb-10 md:mb-12 lg:mb-14">
//           <div className="inline-flex items-center justify-center absolute right-0 top-1/2 transform -translate-y-1/2">
//             <div className="h-2 w-2 bg-[#FF6FE5] rounded-full animate-pulse"></div>
//             <span className="text-[#FF6FE5] font-medium text-sm sm:text-base ml-2">
//               Live Now
//             </span>
//           </div>

//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
//             Live Tournaments
//           </h2>
//           <p className="text-[#94a3b8] text-sm sm:text-base max-w-xl mx-auto">
//             Compete with other players and win big prizes
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           <TournamentCard />
//           <TournamentCard />
//           <TournamentCard />
//         </div>

//         <div className="flex justify-center mt-10 md:mt-12 lg:mt-14">
//           <motion.button
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 0 15px -3px rgba(255, 111, 229, 0.3)",
//             }}
//             whileTap={{ scale: 0.95 }}
//             className="relative group"
//           >
//             <div className="relative bg-gradient-to-r from-[#FF6FE5]/10 to-[#6F6FFB]/10 hover:from-[#FF6FE5]/20 hover:to-[#6F6FFB]/20 border border-[#1e293b] hover:border-[#FF6FE5]/30 px-6 py-3 rounded-lg font-medium transition-all text-white flex items-center gap-2 text-sm sm:text-base">
//               <span>View All Live Tournaments</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="w-4 h-4 group-hover:translate-x-1 transition-transform"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </div>
//           </motion.button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LiveTournaments;
