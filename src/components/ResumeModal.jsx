import { motion, AnimatePresence } from 'framer-motion';

export default function ResumeModal({ isOpen, onClose, isDarkMode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-5xl h-[85vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden border ${
              isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <i className="fas fa-file-pdf text-primary"></i>
                Resume
              </h2>
              <div className="flex items-center gap-3">
                <a 
                  href="https://drive.google.com/file/d/1yTQ4xaqObAOddWNjeGOVBpC6jZgB51mG/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary-hover text-white px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
                >
                  <i className="fas fa-external-link-alt text-[10px]"></i> Open
                </a>
                <button 
                  onClick={onClose}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:text-black hover:bg-gray-200'
                  }`}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            {/* PDF Frame */}
            <div className="flex-1 w-full relative bg-gray-100 dark:bg-gray-800">
              <iframe 
                src="https://drive.google.com/file/d/1yTQ4xaqObAOddWNjeGOVBpC6jZgB51mG/preview" 
                className="absolute inset-0 w-full h-full border-none"
                title="Resume PDF"
                allow="autoplay"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
