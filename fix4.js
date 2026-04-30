const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Normalize line endings for reliable matching
content = content.replace(/\r\n/g, '\n');

const targetStr = `              <motion.div 
                key="hero-image"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: flipDegree }}
                exit={{ scale: 0, opacity: 0, rotateZ: 1080 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
                className="relative inline-block"
              >
                <img 
                  src="/win.svg" 
                  alt="Win Logo" 
                  className={\`w-56 h-56 rounded-full shadow-2xl mx-auto mb-6 object-cover border-4 border-white/10 transition-all duration-300 \${
                    flipCount >= 4 ? 'blur-[2px] sepia-[.5]' : ''
                  } \${
                    flipCount >= 5 ? 'brightness-50 sepia-[.8] hue-rotate-[-50deg]' : ''
                  } \${
                    flipCount >= 6 ? 'blur-[4px]' : ''
                  }\`}
                />
                <AnimatePresence>
                  {winMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 min-w-[200px] z-30 pointer-events-none" 
                      style={{ transform: flipDegree % 360 !== 0 ? 'translateX(-50%) rotateY(180deg)' : 'translateX(-50%) rotateY(0deg)' }}
                    >
                      <div className="relative bg-white text-black px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl text-center border border-gray-200">
                        {winMessage}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>`;

const replaceStr = `              <motion.div 
                key="hero-container"
                exit={{ scale: 0, opacity: 0, rotateZ: 1080 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative inline-block"
                style={{ perspective: '1000px' }}
              >
                <motion.img 
                  src="/win.svg" 
                  alt="Win Logo" 
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: flipDegree }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className={\`w-56 h-56 rounded-full shadow-2xl mx-auto mb-6 object-cover border-4 border-white/10 transition-all duration-300 \${
                    flipCount >= 4 ? 'blur-[2px] sepia-[.5]' : ''
                  } \${
                    flipCount >= 5 ? 'brightness-50 sepia-[.8] hue-rotate-[-50deg]' : ''
                  } \${
                    flipCount >= 6 ? 'blur-[4px]' : ''
                  }\`}
                />
                <AnimatePresence>
                  {winMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.8, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                      exit={{ opacity: 0, scale: 0.8, x: '-50%' }}
                      className="absolute -top-6 left-1/2 min-w-[200px] z-30 pointer-events-none" 
                    >
                      <div className="relative bg-white text-black px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl text-center border border-gray-200">
                        {winMessage}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync('src/App.jsx', content);
  console.log('Successfully updated App.jsx');
} else {
  console.error('Target string not found in App.jsx. Target snippet might have diverged.');
}
