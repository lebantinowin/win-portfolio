const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Normalize line endings for reliable matching
content = content.replace(/\r\n/g, '\n');

const targetStr = `        <motion.div 
          className="relative z-10 mb-8 cursor-pointer group"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onClick={() => {
            if (flipCount >= 6) return;
            const newCount = flipCount + 1;
            setFlipCount(newCount);
            setFlipDegree(prev => prev + 180);
            
            if (newCount === 4) {
              setWinMessage("Please don't flip me again");
            } else if (newCount === 5) {
              setWinMessage("Oh you better stop!");
            } else if (newCount === 6) {
              setWinMessage("I'm gonna find you!");
              setTimeout(() => {
                setShowWarning(true);
              }, 1500);
            } else {
              setWinMessage("");
            }
          }}
          style={{ perspective: '1000px' }}
        >
          {!showWarning ? (
            <motion.div 
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipDegree }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 50 }}
              className="relative inline-block"
            >
              <img 
                src="/win.svg" 
                alt="Win Logo" 
                className={\`w-56 h-56 rounded-full shadow-2xl mx-auto mb-6 object-cover border-4 border-white/10 transition-all duration-300 \${
                  flipCount === 4 ? 'blur-[2px] sepia-[.5]' : ''
                } \${
                  flipCount === 5 ? 'brightness-50 sepia-[.8] hue-rotate-[-50deg]' : ''
                } \${
                  flipCount === 6 ? 'brightness-50 sepia-[.8] hue-rotate-[-50deg] blur-[1px]' : ''
                }\`}
              />
              {winMessage && (
                <div className="absolute inset-0 flex items-center justify-center p-4 z-20 pointer-events-none" style={{ transform: flipDegree % 360 !== 0 ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-bold shadow-2xl text-center border border-white/10 animate-[popupSlideUp_0.3s_ease-out]">
                    {winMessage}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="w-56 h-56 mx-auto mb-6 flex items-center justify-center bg-red-900/40 rounded-full border border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)] animate-pulse">
              <p className="text-red-400 font-bold text-center px-4">
                You angered Win and decided to come for you...be ready.
              </p>
            </div>
          )}
        </motion.div>`;

const replaceStr = `        <motion.div 
          className="relative z-10 mb-8 cursor-pointer group"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onClick={() => {
            if (showWarning || flipCount >= 6) return;
            const newCount = flipCount + 1;
            setFlipCount(newCount);
            setFlipDegree(prev => prev + 720);
            
            if (newCount === 4) {
              setWinMessage("Please don't flip me again 😵");
            } else if (newCount === 5) {
              setWinMessage("Oh you better stop! 😠");
            } else if (newCount === 6) {
              setWinMessage("I'm gonna find you! 😡");
              setTimeout(() => {
                setShowWarning(true);
              }, 1500);
            } else {
              setWinMessage("");
            }
          }}
          style={{ perspective: '1000px' }}
        >
          <AnimatePresence mode="wait">
            {!showWarning ? (
              <motion.div 
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
              </motion.div>
            ) : (
              <motion.div 
                key="hero-warning"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-56 h-56 mx-auto mb-6 flex flex-col items-center justify-center bg-red-900/80 rounded-full border border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.8)] p-6 relative overflow-hidden"
              >
                {!isDoomed ? (
                  <>
                    <p className="text-red-400 font-bold text-center mb-4 leading-tight text-sm">
                      You angered Win and decided to come for you...be ready.
                    </p>
                    <p className="text-white text-sm font-bold mb-3">Are you sorry?</p>
                    <div className="flex gap-3 relative z-10">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlipCount(0);
                          setShowWarning(false);
                          setIsDoomed(false);
                          setWinMessage("Apology accepted 😌");
                          setTimeout(() => setWinMessage(""), 3000);
                        }}
                        className="px-3 py-1 bg-green-500 hover:bg-green-400 text-white rounded font-bold text-sm transition-transform hover:scale-105"
                      >Yes</button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDoomed(true);
                        }}
                        className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded font-bold text-sm transition-transform hover:scale-105"
                      >No</button>
                    </div>
                  </>
                ) : (
                  <p className="text-red-500 font-black text-center text-lg uppercase animate-[pulse_0.5s_ease-in-out_infinite]">
                    Close your windows and lock your doors. 💀
                  </p>
                )}
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
