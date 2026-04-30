import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO at TechStart",
    content: "Win is an exceptional developer. They transformed our outdated platform into a modern, blazing-fast application. The attention to detail and UI/UX expertise is unmatched.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager at InnovateCo",
    content: "Working with Win was a breeze. They delivered the project ahead of schedule and the code quality was superb. I highly recommend them for any complex full-stack web projects.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Startup Founder",
    content: "The beautiful animations and smooth transitions Win implemented completely elevated our brand's online presence. Our user engagement went up 40% after the redesign.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

export default function Testimonials({ isDarkMode }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    startTimer();
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const t = testimonials[current];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-4xl mx-auto rounded-3xl p-8 md:p-12 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'
      }`}
    >
      <i className="fas fa-quote-right absolute top-8 right-8 text-8xl text-primary opacity-10 pointer-events-none"></i>

      {/* Slides */}
      <div className="relative min-h-[260px] flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={t.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex flex-col items-center text-center px-4 absolute inset-0 justify-center"
          >
            <p className={`text-base md:text-2xl italic mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              "{t.content}"
            </p>
            <div className="flex items-center gap-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full border-2 border-primary object-cover"
              />
              <div className="text-left">
                <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>{t.name}</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-primary w-6' : isDarkMode ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-300 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
