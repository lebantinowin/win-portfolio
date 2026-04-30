import { motion } from 'framer-motion';

export default function ProjectModal({ project, isDarkMode, onClose, t }) {
  if (!project) return null;

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
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isDarkMode ? 'bg-black/50 hover:bg-black text-white' : 'bg-white/80 hover:bg-gray-100 text-black'
          }`}
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="relative w-full h-64 sm:h-80 md:h-96">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{project.title}</h2>
          </div>
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
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-8 text-lg`}>
            {project.description}
            <br /><br />
            This is a simulated detailed case study section for {project.title}. Here, you can describe the problem you solved, your design decisions, the architecture, and the final outcomes.
          </p>

          <div className="flex gap-4 mt-8">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-hover transition-all font-semibold"
            >
              <i className="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all font-semibold ${
                isDarkMode 
                  ? 'border-gray-700 text-white hover:bg-gray-800' 
                  : 'border-gray-300 text-black hover:bg-gray-100'
              }`}
            >
              <i className="fab fa-github"></i> Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
