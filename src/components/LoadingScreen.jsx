import { motion } from 'framer-motion';

export default function LoadingScreen({ isDarkMode }) {
  return (
    <motion.div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        className="relative w-24 h-24 mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={isDarkMode ? 'white' : 'black'}
            strokeWidth="2"
            strokeDasharray="283"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: [283, 0, -283] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={isDarkMode ? "/nav_logo_dark.svg" : "/nav_logo_light.svg"} alt="Logo" className="w-12 h-12 object-contain animate-pulse" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-lg font-light tracking-widest uppercase"
      >
        Loading Experience
      </motion.div>
    </motion.div>
  );
}
