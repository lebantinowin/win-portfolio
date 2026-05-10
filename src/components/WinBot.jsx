import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SENSITIVE_WORDS = [
  'fuck', 'shit', 'ass', 'bitch', 'cunt', 'dick', 'sex', 'porn', 'kill', 'die', 
  'stupid', 'idiot', 'damn', 'crap', 'bastard', 'nude', 'slut', 'whore', 'fag', 'gay', 'lesbian'
];

const SHORTCUTS = [
  "Tell me about your projects",
  "What is your tech stack?",
  "How can I contact you?",
  "Tell me about your teams"
];

const BOT_KNOWLEDGE = [
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'sup', 'bello'],
    response: "Hello there! I'm WinBot 🤖. I can tell you all about Win's skills, experience, projects, or how to contact him. What would you like to know?"
  },
  {
    keywords: ['skill', 'skills', 'tech', 'stack', 'languages', 'react', 'node', 'javascript', 'html', 'css', 'php', 'laravel', 'mysql', 'tailwind', 'vite'],
    response: "Win is a full-stack developer! His main tech stack includes React, Laravel, PHP, MySQL, Tailwind CSS, JavaScript, and Vite. He builds robust, modern web applications from frontend to backend."
  },
  {
    keywords: ['project', 'projects', 'work', 'portfolio', 'tabulation', 'spectaqr', 'warzone', 'nexus'],
    response: "Win has four featured projects right now: 1) A Laravel Tabulation System, 2) SectaQR attendance system, 3) Warzone Gym CRM, and 4) Nexus League, a tournament bracket manager!"
  },
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'message'],
    response: "You can reach Win via email at lebantinowin@gmail.com, or connect with him on LinkedIn, GitHub, Facebook, YouTube, or TikTok! Just scroll to the bottom 'Connect' section."
  },
  {
    keywords: ['school', 'education', 'college', 'degree', 'university', 'study', 'graduate'],
    response: "Win is taking his B.S. in Information Technology at Ilocos Sur Polytechnic State College (Candon Campus). He is a Cum Laude & Valedictorian candidate, and won Best Thesis for 'Smart Hub for Adaptive Digital Engagement'."
  },
  {
    keywords: ['team', 'teams', 'eccentri', 'nexus', 'leader', 'founder'],
    response: "Win is the Founder and Leader of two distinct teams: ECCENTRI (an IT solutions team providing tabulation, streaming, and photography) and NEXUS LEAGUE (a dynamic multimedia and gaming community)."
  },
  {
    keywords: ['experience', 'job', 'intern', 'work', 'freelance', 'manager'],
    response: "Win has been a Web Developer Intern at MoodLearning, Inc., a Freelance Digital Services provider since 2021, and also has management and customer service experience as a Manager at Triple G's Water Refilling Station and Waiter at Francisca Francisco's Place."
  },
  {
    keywords: ['about', 'who are you', 'what do you do', 'win'],
    response: "Win is a passionate full-stack web and mobile developer, and a writer. He loves working with cutting-edge technologies and transforming ideas into engaging digital experiences. And I'm his AI assistant, WinBot!"
  }
];

export default function WinBot({ isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm WinBot 🤖. Ask me anything about Win's portfolio!", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const processMessage = (input) => {
    const lowerInput = input.toLowerCase();

    // Check for sensitive words
    const containsSensitive = SENSITIVE_WORDS.some(word => {
      // check if the word is an exact word match using regex boundary
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(lowerInput);
    });

    if (containsSensitive) {
      return "I'm sorry, but I cannot respond to inappropriate language. Please keep the conversation professional and ask me about Win's portfolio! 🛡️";
    }

    // Check knowledge base
    for (const rule of BOT_KNOWLEDGE) {
      if (rule.keywords.some(kw => lowerInput.includes(kw))) {
        return rule.response;
      }
    }

    // Default response
    return "I'm not exactly sure about that! Try asking me about Win's 'skills', 'projects', 'education', or how to 'contact' him.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const responseText = processMessage(userMessage.text);
      setMessages(prev => [...prev, { text: responseText, isBot: true }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400); // 600-1000ms delay
  };

  const handleShortcut = (text) => {
    if (isTyping) return;
    const userMessage = { text, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const responseText = processMessage(text);
      setMessages(prev => [...prev, { text: responseText, isBot: true }]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleClearChat = () => {
    setMessages([
      { text: "Hi! I'm WinBot 🤖. Ask me anything about Win's portfolio!", isBot: true }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ 
          scale: [1, 1.05, 1],
          y: [0, -4, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        } bg-transparent`}
      >
        <img 
          src="/winbotchibi.svg" 
          alt="WinBot" 
          className="w-full h-full object-contain drop-shadow-2xl hover:drop-shadow-[0_8px_32px_rgba(59,130,246,0.6)] transition-all" 
        />
        
        {/* Unread dot indicator */}
        {messages.length === 1 && (
          <span className="absolute top-1 right-1 md:top-2 md:right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-black"></span>
          </span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-4 sm:bottom-8 right-4 sm:right-8 left-4 sm:left-auto origin-bottom-right sm:w-[350px] h-[500px] max-w-none max-h-[calc(100vh-6rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border ${
              isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`px-4 py-3 flex justify-between items-center ${isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-50 border-b border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center -ml-1">
                  <img src="/winbotchibi.svg" alt="WinBot" className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>WinBot</h3>
                  <p className={`text-[10px] ${isDarkMode ? 'text-green-400' : 'text-green-600'} flex items-center gap-1`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" /> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={handleClearChat}
                  title="Clear Chat"
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-black hover:bg-gray-200'
                  }`}
                >
                  <i className="fas fa-trash-alt text-[11px]" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-black hover:bg-gray-200'
                  }`}
                >
                  <i className="fas fa-times text-sm" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDarkMode ? 'bg-black/50' : 'bg-gray-50/50'}`}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      msg.isBot 
                        ? isDarkMode 
                          ? 'bg-gray-800 text-gray-200 rounded-tl-sm' 
                          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                        : 'bg-primary text-white rounded-tr-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm flex items-center gap-1 ${
                    isDarkMode ? 'bg-gray-800 rounded-tl-sm' : 'bg-white border border-gray-200 rounded-tl-sm'
                  }`}>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Shortcuts */}
            <div className={`px-3 py-2 border-t overflow-x-auto whitespace-nowrap flex gap-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {SHORTCUTS.map((shortcut, idx) => (
                <button
                  key={idx}
                  onClick={() => handleShortcut(shortcut)}
                  disabled={isTyping}
                  className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors flex-shrink-0 ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {shortcut}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className={`p-3 border-t ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className={`w-full rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    isDarkMode 
                      ? 'bg-gray-900 text-white placeholder-gray-500 border border-gray-700' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500 border border-transparent'
                  }`}
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={`absolute right-1 top-1 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    inputValue.trim() && !isTyping
                      ? 'bg-primary text-white' 
                      : isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  <i className="fas fa-paper-plane text-xs ml-[-1px]" />
                </button>
              </div>
              <div className="text-center mt-2">
                 <span className={`text-[9px] ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Powered by Simulated NLP</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
