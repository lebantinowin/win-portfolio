import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ProjectModal({ project, isDarkMode, onClose, t }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const images = project.images || [project.image];

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        } border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
      >
        {/* Sticky Close Button — always visible */}
        <div className="sticky top-0 z-20 flex justify-end pr-4 pt-4 pointer-events-none">
          <button
            onClick={onClose}
            className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg ${
              isDarkMode ? 'bg-black/70 hover:bg-black text-white' : 'bg-white/90 hover:bg-gray-100 text-black'
            }`}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="relative w-full h-64 sm:h-80 md:h-[450px] group overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={images[currentImageIndex]} 
              alt={`${project.title} screenshot ${currentImageIndex + 1}`} 
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6 md:p-8 pointer-events-none">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg line-clamp-3">{project.title}</h2>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 md:hover:scale-110 z-10"
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 md:hover:scale-110 z-10"
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </button>
              
              <div className="absolute bottom-4 right-8 flex gap-2">
                {images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'w-6 bg-primary' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span key={i} className="bg-primary/20 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4">Overview</h3>
          <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-8 text-lg whitespace-pre-wrap`}>
            {project.detailedDescription || project.description}
          </div>

          <div className="flex gap-4 mt-8">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-hover transition-all font-semibold"
              >
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            )}
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all font-semibold ${
                  isDarkMode 
                    ? 'border-gray-700 text-white hover:bg-gray-800' 
                    : 'border-gray-300 text-black hover:bg-gray-100'
                }`}
              >
                <i className="fab fa-github"></i> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
