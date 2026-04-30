import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Marquee from './components/Marquee';
import LoadingScreen from './components/LoadingScreen';
import HeroBackground from './components/HeroBackground';
import ProjectModal from './components/ProjectModal';
import Timeline from './components/Timeline';
import BlogSection from './components/BlogSection';
import Testimonials from './components/Testimonials';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import WinBot from './components/WinBot';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [visitCount, setVisitCount] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showGamePopup, setShowGamePopup] = useState(false);
  const [isGameClosing, setIsGameClosing] = useState(false);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [isLanguageClosing, setIsLanguageClosing] = useState(false);
  const [themeColor, setThemeColor] = useState('#3b82f6');
  const [showThemeColorPopup, setShowThemeColorPopup] = useState(false);
  const [isThemeColorClosing, setIsThemeColorClosing] = useState(false);
  const [language, setLanguage] = useState('english');
  const [navSide, setNavSide] = useState('left');
  
  // Easter Egg States
  const [flipCount, setFlipCount] = useState(0);
  const [flipDegree, setFlipDegree] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [winMessages, setWinMessages] = useState([]);
  const [isDoomed, setIsDoomed] = useState(false);
  const [activeSocialPopup, setActiveSocialPopup] = useState(null);
  const [socialPopupClosing, setSocialPopupClosing] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' });
  const [emailStatus, setEmailStatus] = useState({ sending: false, success: false, error: null });
  const greetingsByLanguage = {
    english: 'Hi,',
    tagalog: 'Kamusta,',
    japanese: 'こんにちは,',
    korean: '안녕하세요,',
    minion: 'Bello,'
  };
  const greeting = greetingsByLanguage[language] || greetingsByLanguage.english;

  // Translations for all text content
  const translations = {
    english: {
      tagline: 'Web Developer | Mobile Developer | Writer',
      seeMyWork: 'See My Work',
      downloadResume: 'Download Resume',
      aboutTitle: 'About Me',
      aboutP1: "I'm Win, a passionate full-stack developer with expertise in creating modern web applications. With a strong foundation in React, Node.js, and cloud technologies, I transform ideas into engaging digital experiences.",
      aboutP2: "I love working with cutting-edge technologies and staying updated with the latest industry trends. When I'm not coding, you can find me exploring new design patterns or contributing to open-source projects.",
      years: 'Years',
      projects: 'Projects',
      clients: 'Clients',
      happyClients: 'Happy Clients',
      featuredProjects: 'Featured Projects',
      viewProject: 'View Project →',
      letsWorkTogether: "Let's Work Together",
      workTogetherDesc: "I'm always interested in hearing about new projects and opportunities.",
      connect: 'Connect',
      footer: 'All rights reserved.',
      visits: 'visits'
    },
    tagalog: {
      tagline: 'Web Developer | Mobile Developer | Manunulat',
      seeMyWork: 'Tingnan ang aking trabaho',
      downloadResume: 'I-download ang Resume',
      aboutTitle: 'Tungkol sa Akin',
      aboutP1: "Ako si Win, isang passionate full-stack developer na may kasanayan sa paggawa ng modern web applications. May matibay na pundasyon sa React, Node.js, at cloud technologies, nagbabago ako ng mga ideya sa engaging digital experiences.",
      aboutP2: "Mahilig akong magtrabaho sa cutting-edge technologies at manatiling updated sa pinakabagong trends sa industriya. Kapag hindi ako nagco-code, maaari mo akong makitang nag-eexplore ng bagong design patterns o nagco-contribute sa open-source projects.",
      years: 'Taon',
      projects: 'Mga Proyekto',
      clients: 'Mga Kliyente',
      happyClients: 'Masasayang Kliyente',
      featuredProjects: 'Mga Itinatampok na Proyekto',
      viewProject: 'Tingnan ang Proyekto →',
      letsWorkTogether: 'Tara, Magtrabaho Tayo',
      workTogetherDesc: 'Laging interesado akong makarinig tungkol sa bagong mga proyekto at oportunidad.',
      connect: 'Kumonekta',
      footer: 'Lahat ng karapatan ay nakalaan.',
      visits: 'mga bisita'
    },
    japanese: {
      tagline: 'Web開発者 | モバイル開発者 | 作家',
      seeMyWork: '作品を見る',
      downloadResume: '履歴書をダウンロード',
      aboutTitle: '自己紹介',
      aboutP1: 'Winと申します。モダンなWebアプリケーションの作成に精通した情熱的なフルスタック開発者です。React、Node.js、クラウド技術の強固な基盤を持ち、アイデアを魅力的なデジタル体験に変えています。',
      aboutP2: '最先端の技術に取り組み、最新の業界トレンドを常に把握することを愛しています。コーディングしていないときは、新しいデザインパターンを探求したり、オープンソースプロジェクトに貢献したりしています。',
      years: '年',
      projects: 'プロジェクト',
      clients: 'クライアント',
      happyClients: '満足のいくクライアント',
      featuredProjects: '注目のプロジェクト',
      viewProject: 'プロジェクトを見る →',
      letsWorkTogether: '一緒に働きましょう',
      workTogetherDesc: '新しいプロジェクトや機会について常にお聞きしたいと思っています。',
      connect: '接続',
      footer: '全著作権所有。',
      visits: 'アクセス'
    },
    korean: {
      tagline: '웹 개발자 | 모바일 개발자 | 작가',
      seeMyWork: '내 작품 보기',
      downloadResume: '이력서 다운로드',
      aboutTitle: '소개',
      aboutP1: '저는 Win입니다. 현대적인 웹 애플리케이션 생성에 전문성을 가진 열정적인 풀스택 개발자입니다. React, Node.js 및 클라우드 기술에 대한 견고한 기반을 바탕으로 아이디어를 매력적인 디지털 경험으로 전환합니다.',
      aboutP2: '최첨단 기술을 다루고 최신 업계 동향을 파악하는 것을 좋아합니다. 코딩을 하지 않을 때는 새로운 디자인 패턴을 탐색하거나 오픈 소스 프로젝트에 기여하는 것을 찾을 수 있습니다.',
      years: '년',
      projects: '프로젝트',
      clients: '클이언트',
      happyClients: '만족한 클라이언트',
      featuredProjects: '주요 프로젝트',
      viewProject: '프로젝트 보기 →',
      letsWorkTogether: '함께 일해요',
      workTogetherDesc: '새로운 프로젝트와 기회에 대해 항상 듣고 싶습니다.',
      connect: '연결',
      footer: '모든 권리 보유.',
      visits: '방문'
    },
    minion: {
      tagline: 'Banana Developer | Banana Mobile | Banana Writer',
      seeMyWork: 'See Banana Work',
      downloadResume: 'Download Banana',
      aboutTitle: 'About Me (Bello!)',
      aboutP1: 'Me Win! Full-stack minion developer! Me make modern web banana applications. Me know React, Node.js, cloud technologies! Me turn ideas into banana digital experiences!',
      aboutP2: 'Me love cutting-edge banana technologies! Me always updated with latest banana trends. When me not coding, me explore new banana patterns or contribute to open-banana projects!',
      years: 'Banana Years',
      projects: 'Banana Projects',
      clients: 'Banana Clients',
      happyClients: 'Happy Banana Clients',
      featuredProjects: 'Featured Banana Projects',
      viewProject: 'View Banana Project →',
      letsWorkTogether: 'Let\'s Work Banana Together!',
      workTogetherDesc: 'Me always interested in new banana projects and opportunities!',
      connect: 'Connect (Bello!)',
      footer: 'All banana rights reserved.',
      visits: 'minion visits'
    }
  };
  const t = translations[language] || translations.english;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      const sections = ['home', 'about', 'projects', 'contact'];
      const viewportCenter = window.innerHeight / 3;
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = stored ? stored === 'dark' : prefersDark;
    setIsDarkMode(initialDark);
    if (initialDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, []);

  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `${r} ${g} ${b}`;
  };

  // Initialize color theme from localStorage
  useEffect(() => {
    const storedColor = localStorage.getItem('themeColor');
    if (storedColor) {
      setThemeColor(storedColor);
      const rgb = hexToRgb(storedColor);
      document.documentElement.style.setProperty('--color-primary', storedColor);
      document.documentElement.style.setProperty('--color-primary-hover', storedColor);
      document.documentElement.style.setProperty('--color-secondary', storedColor);
      document.documentElement.style.setProperty('--color-primary-rgb', rgb);
      document.documentElement.style.setProperty('--color-primary-hover-rgb', rgb);
      document.documentElement.style.setProperty('--color-secondary-rgb', rgb);
    }
  }, []);

  const handleColorChange = (color) => {
    setThemeColor(color);
    localStorage.setItem('themeColor', color);
    const rgb = hexToRgb(color);
    document.documentElement.style.setProperty('--color-primary', color);
    document.documentElement.style.setProperty('--color-primary-hover', color);
    document.documentElement.style.setProperty('--color-secondary', color);
    document.documentElement.style.setProperty('--color-primary-rgb', rgb);
    document.documentElement.style.setProperty('--color-primary-hover-rgb', rgb);
    document.documentElement.style.setProperty('--color-secondary-rgb', rgb);
  };

  // Static greeting - no animation

  // ✅ Visit counter using CountAPI
  useEffect(() => {
    const trackVisits = async () => {
      try {
        const res = await fetch('https://api.counterapi.dev/v1/win-portfolio-2026/visits/up');
        const data = await res.json();
        setVisitCount(data.count);
      } catch (error) {
        console.error('Failed to fetch visit count:', error);
        setVisitCount(null);
      }
    };
    trackVisits();
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // Custom cursor position and click echoes
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [echoes, setEchoes] = useState([]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    const handleClick = (e) => {
      const newEcho = { id: Date.now(), x: e.clientX, y: e.clientY };
      setEchoes(prev => [...prev, newEcho]);
      setTimeout(() => {
        setEchoes(prev => prev.filter(echo => echo.id !== newEcho.id));
      }, 600);
    };
    const handleTouch = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const newEcho = { id: Date.now(), x: touch.clientX, y: touch.clientY };
        setEchoes(prev => [...prev, newEcho]);
        setTimeout(() => {
          setEchoes(prev => prev.filter(echo => echo.id !== newEcho.id));
        }, 600);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  const downloadResume = () => {
    const resumeLink = '/Aldwin_Lebantino_Resume.pdf';
    const element = document.createElement('a');
    element.setAttribute('href', resumeLink);
    element.setAttribute('download', 'Aldwin_Lebantino_Resume.pdf');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'This responsive React portfolio with smooth animations, dark mode, and multi-language support.',
      tags: ['React', 'Tailwind', 'Vite'],
      link: 'https://github.com/lebantinowin/win-portfolio',
      image: 'https://images.unsplash.com/photo-1507238692062-110ce3a12b90?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce with Stripe payments, user auth, and admin dashboard.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://github.com/lebantinowin/ecommerce-demo',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Data Analytics Dashboard',
      description: 'Real-time dashboard with interactive charts, filters, and API integration.',
      tags: ['React', 'Chart.js', 'Node.js', 'Express'],
      link: 'https://github.com/lebantinowin/analytics-dashboard',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    }
  ];

  const getStats = () => [
    { label: t.years,         value: '5+', highlight: false },
    { label: t.projects,      value: '68', highlight: true  },
    { label: t.clients,       value: '30', highlight: false },
    { label: t.happyClients,  value: '08', highlight: false }
  ];

  const frontRow = [
    { src: '/logos/html5.svg', label: 'HTML5' },
    { src: '/logos/css3.svg', label: 'CSS3' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', label: 'Tailwind' },
    { src: '/logos/javascript.svg', label: 'JavaScript' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', label: 'PHP' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', label: 'MySQL' },
  ];

  const backRow = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', label: 'Laravel' },
    { src: '/logos/react.svg', label: 'React' },
    { src: '/logos/typescript.svg', label: 'TypeScript' },
    { src: '/logos/vite.svg', label: 'Vite' },
    { src: '/logos/nodejs.svg', label: 'Node.js' },
    { src: '/logos/express.svg', label: 'Express' },
  ];

  const toolsRow = [
    { src: '/logos/github.svg', label: 'GitHub' },
    { src: '/logos/git.svg', label: 'Git' },
    { src: '/logos/docker.svg', label: 'Docker' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', label: 'VS Code' },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', label: 'Postman' },
  ];

  return (
    <div className="font-poppins bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 custom-cursor">
      <div className="noise-overlay"></div>
      
      <AnimatePresence>
        {isLoading && <LoadingScreen isDarkMode={isDarkMode} />}
      </AnimatePresence>

      {/* Sidebar handles both desktop sidebar + mobile topbar */}
      <Sidebar
        isDarkMode={isDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        navSide={navSide}
        setNavSide={setNavSide}
      />

      {/* Hero Section */}
      <section id="home" className="relative scroll-mt-24 min-h-screen flex flex-col justify-center items-center text-center px-5 bg-transparent pt-24 md:pt-20 pb-20 overflow-hidden">
        <HeroBackground isDarkMode={isDarkMode} />
        {/* Hero picture wrapper — message floats ABOVE in absolute, never shifts layout */}
        <div className="relative z-10 mb-8 flex flex-col items-center" style={{ perspective: '1000px' }}>

          {/* Scattered speech bubbles — absolutely positioned around image */}
          <AnimatePresence>
            {!showWarning && winMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ type: 'spring', stiffness: 600, damping: 22 }}
                className="absolute z-30 pointer-events-none"
                style={{ top: msg.y, left: msg.x, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative bg-white text-black px-3 py-1.5 rounded-2xl text-xs font-bold shadow-2xl text-center border border-gray-200 whitespace-nowrap">
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!showWarning ? (
              <motion.div
                key="hero-image-wrap"
                className="cursor-pointer relative inline-block"
                exit={{ scale: 0, opacity: 0, rotateZ: 720, transition: { duration: 0.9, ease: 'easeInOut' } }}
                onClick={() => {
                  if (showWarning || flipCount >= 6) return;
                  const newCount = flipCount + 1;
                  setFlipCount(newCount);
                  setFlipDegree(prev => prev + 360);

                  const messagesByCount = [
                    "Hey, stop flipping me! 😵",
                    "Please don't flip me again 😵",
                    "Oh you better stop! 😠",
                    "I'm warning you... 😠",
                    "Last warning! 😡",
                    "I'm gonna find you! 😡",
                  ];
                  const text = messagesByCount[newCount - 1];

                  // Random position scattered around the image (224x224px)
                  const angles = [315, 45, 270, 90, 225, 135];
                  const angle = (angles[newCount - 1] + (Math.random() * 30 - 15)) * (Math.PI / 180);
                  const radius = 130 + Math.random() * 20;
                  const cx = 112; // center of 224px image
                  const cy = 112;
                  const x = cx + Math.cos(angle) * radius;
                  const y = cy + Math.sin(angle) * radius;

                  const id = Date.now();
                  setWinMessages(prev => [...prev, { id, text, x, y }]);
                  setTimeout(() => {
                    setWinMessages(prev => prev.filter(m => m.id !== id));
                  }, 3000);

                  if (newCount === 6) {
                    setTimeout(() => setShowWarning(true), 1500);
                  }
                }}
              >
                <motion.img
                  src="/win.svg"
                  alt="Win Logo"
                  animate={{ rotateY: flipDegree }}
                  transition={{ type: 'spring', stiffness: 80, damping: 12, mass: 1.2 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`w-56 h-56 rounded-full shadow-2xl mx-auto mb-6 object-cover border-4 border-white/10 transition-[filter] duration-500 ${
                    flipCount >= 3 ? 'sepia-[.5] blur-[1px]' : ''
                  } ${
                    flipCount >= 5 ? 'sepia-[1] brightness-50 hue-rotate-[-50deg]' : ''
                  }`}
                />
              </motion.div>
            ) : (
              <motion.div
                key="hero-warning"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="w-56 h-56 mx-auto mb-6 flex flex-col items-center justify-center bg-red-900/80 rounded-full border border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.8)] p-6 relative overflow-hidden"
              >
                {!isDoomed ? (
                  <>
                    <p className="text-red-400 font-bold text-center mb-4 leading-tight text-xs">
                      You angered Win and he decided to come for you...be ready.
                    </p>
                    <p className="text-white text-sm font-bold mb-3">Are you sorry?</p>
                    <div className="flex gap-3 relative z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlipCount(0);
                          setFlipDegree(0);
                          setShowWarning(false);
                          setIsDoomed(false);
                          const id = Date.now();
                          setWinMessages([{ id, text: "Apology accepted 😌", x: 112, y: -20 }]);
                          setTimeout(() => setWinMessages([]), 3000);
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
                  <motion.p
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="text-red-500 font-black text-center text-sm uppercase"
                  >
                    Close your windows and lock your doors. 💀
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.h1 
          className="relative z-10 text-5xl md:text-6xl font-black mb-3 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {greeting}&nbsp;I'm <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Win</span>
        </motion.h1>
        <motion.p 
          className={`relative z-10 text-lg md:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-8 max-w-2xl font-light`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t.tagline}
        </motion.p>
        <motion.div 
          className="relative z-10 flex gap-3 sm:gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="#projects" className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full border-2 border-primary text-white bg-primary-hover hover:bg-primary-hover transition-all font-semibold">
            <i className="fas fa-arrow-right"></i> <span className="hidden sm:inline">{t.seeMyWork}</span>
          </a>
          <button onClick={downloadResume} className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-black transition-all font-semibold">
            <i className="fas fa-download"></i> <span className="hidden sm:inline">{t.downloadResume}</span>
          </button>
        </motion.div>
        <motion.div 
          className="relative z-10 mt-8 md:absolute md:bottom-8 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span className="text-gray-500 text-sm">↓ Scroll to explore</span>
        </motion.div>
      </section>

      {/* Tech Stack Marquee */}
      <section id="services" className="scroll-mt-24 py-16 px-5 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Marquee items={frontRow} speed={60} />
          </div>
          <div className="mb-6">
            <Marquee items={backRow} speed={48} reverse />
          </div>
          <div>
            <Marquee items={toolsRow} speed={72} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 py-20 px-5 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <i className="fas fa-user-circle text-primary mr-2"></i> {t.aboutTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed text-justify`}>
                {t.aboutP1}
              </p>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed text-justify`}>
                {t.aboutP2}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {getStats().map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg text-center transition-all ${
                    stat.highlight
                      ? 'bg-primary text-white scale-105 shadow-2xl shadow-primary/50'
                      : 'bg-white text-gray-900 dark:bg-black dark:text-gray-300 border border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24 py-20 px-5 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <i className="fas fa-code text-primary mr-2"></i> {t.featuredProjects}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-primary/5 border border-gray-800 rounded-xl hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {project.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-4 leading-relaxed flex-grow`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="bg-primary/20 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button onClick={() => setSelectedProject(project)} className="text-primary font-bold hover:text-secondary transition-colors inline-flex items-center gap-2 group/link mt-auto">
                    {t.viewProject} <i className="fas fa-arrow-right transform group-hover/link:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section id="experience" className="py-20 px-5 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <i className="fas fa-route text-primary mr-2"></i> Journey
          </h2>
          <Timeline isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-5 bg-gray-50 dark:bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <i className="fas fa-pen-nib text-primary mr-2"></i> Writer's Corner
          </h2>
          <BlogSection isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-5 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <i className="fas fa-star text-primary mr-2"></i> Testimonies
          </h2>
          <Testimonials isDarkMode={isDarkMode} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 py-20 px-5 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-2 md:mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <i className="fas fa-envelope text-primary mr-2"></i> {t.letsWorkTogether}
          </h2>
          <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-12 text-lg`}>
            {t.workTogetherDesc}
          </p>
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <h4 className="text-secondary font-bold mb-6">
                <i className="fas fa-share-nodes text-primary mr-2"></i> {t.connect}
              </h4>
              <div className="flex justify-center gap-3">
                {[
                  { id: 'gmail', icon: 'fas fa-envelope' },
                  { id: 'linkedin', icon: 'fab fa-linkedin-in' },
                  { id: 'github', icon: 'fab fa-github' },
                  { id: 'youtube', icon: 'fab fa-youtube' },
                  { id: 'facebook', icon: 'fab fa-facebook-f' },
                  { id: 'tiktok', icon: 'fab fa-tiktok' }
                ].map((social) => (
                  <button
                    key={social.id}
                    onClick={() => {
                      if (activeSocialPopup === social.id) {
                        setSocialPopupClosing(true);
                        setTimeout(() => {
                          setActiveSocialPopup(null);
                          setSocialPopupClosing(false);
                        }, 100);
                      } else {
                        setActiveSocialPopup(social.id);
                      }
                    }}
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all group ${isDarkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}
                    title={social.id}
                  >
                    <i className={`${social.icon} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Popups */}
      {activeSocialPopup && activeSocialPopup !== 'gmail' && (
        <div className={`fixed inset-0 z-[70] flex items-center justify-center p-4 ${socialPopupClosing ? 'animate-[fadeOut_0.1s_ease-in]' : 'animate-[fadeIn_0.1s_ease-out]'}`}>
          <div className="absolute inset-0 bg-black/50" onClick={() => {
            setSocialPopupClosing(true);
            setTimeout(() => {
              setActiveSocialPopup(null);
              setSocialPopupClosing(false);
            }, 100);
          }}></div>
          <div className={`relative rounded-2xl p-6 max-w-sm w-full shadow-2xl ${socialPopupClosing ? 'animate-[popupSlideDown_0.1s_ease-in]' : 'animate-[popupSlideUp_0.1s_ease-out]'} ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <button
              onClick={() => {
                setSocialPopupClosing(true);
                setTimeout(() => {
                  setActiveSocialPopup(null);
                  setSocialPopupClosing(false);
                }, 100);
              }}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-black hover:bg-gray-200'} transition-all`}
            >
              <i className="fas fa-times"></i>
            </button>
            {activeSocialPopup === 'linkedin' && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-hover/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-linkedin-in text-3xl text-primary-hover"></i>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>LinkedIn</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@aldwin-lebantino-031008347</p>
                <a
                  href="https://www.linkedin.com/in/aldwin-lebantino-031008347/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary-hover text-white hover:bg-primary-hover transition-all font-semibold"
                >
                  <i className="fas fa-external-link-alt"></i> Visit Profile
                </a>
              </div>
            )}
            {activeSocialPopup === 'github' && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-700/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-github text-3xl text-gray-700"></i>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>GitHub</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@lebantinowin</p>
                <a
                  href="https://github.com/lebantinowin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition-all font-semibold"
                >
                  <i className="fas fa-external-link-alt"></i> Visit Profile
                </a>
              </div>
            )}
            {activeSocialPopup === 'facebook' && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-facebook-f text-3xl text-primary"></i>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Facebook</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@lebantinowin</p>
                <a
                  href="https://www.facebook.com/lebantinowin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-hover transition-all font-semibold"
                >
                  <i className="fas fa-external-link-alt"></i> Visit Profile
                </a>
              </div>
            )}
            {activeSocialPopup === 'youtube' && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-youtube text-3xl text-red-600"></i>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>YouTube</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@lebantinowin</p>
                <a
                  href="https://www.youtube.com/channel/UCtmMG1wFZEIQytknuydAADg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all font-semibold"
                >
                  <i className="fas fa-external-link-alt"></i> Visit Channel
                </a>
              </div>
            )}
            {activeSocialPopup === 'tiktok' && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-tiktok text-3xl text-black"></i>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>TikTok</h3>
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@lebantinowin</p>
                <a
                  href="https://www.tiktok.com/@lebantinowin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-all font-semibold"
                >
                  <i className="fas fa-external-link-alt"></i> Visit Profile
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email Contact Form Popup */}
      {activeSocialPopup === 'gmail' && (
        <div className={`fixed inset-0 z-[70] flex items-center justify-center p-4 ${socialPopupClosing ? 'animate-[fadeOut_0.1s_ease-in]' : 'animate-[fadeIn_0.1s_ease-out]'}`}>
          <div className="absolute inset-0 bg-black/50" onClick={() => {
            setSocialPopupClosing(true);
            setTimeout(() => {
              setActiveSocialPopup(null);
              setSocialPopupClosing(false);
            }, 100);
          }}></div>
          <div className={`relative rounded-2xl p-6 max-w-md w-full shadow-2xl ${socialPopupClosing ? 'animate-[popupSlideDown_0.1s_ease-in]' : 'animate-[popupSlideUp_0.1s_ease-out]'} ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <button
              onClick={() => {
                setSocialPopupClosing(true);
                setTimeout(() => {
                  setActiveSocialPopup(null);
                  setSocialPopupClosing(false);
                }, 100);
              }}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-black hover:bg-gray-200'} transition-all`}
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-3xl text-red-500"></i>
              </div>
              <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Send Email</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>lebantinowin@gmail.com</p>
            </div>
            {emailStatus.success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-3xl text-green-500"></i>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Email Sent!</h3>
                <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Thank you for reaching out. I'll get back to you soon!</p>
                <button
                  onClick={() => {
                    setEmailStatus({ sending: false, success: false, error: null });
                    setSocialPopupClosing(true);
                    setTimeout(() => {
                      setActiveSocialPopup(null);
                      setSocialPopupClosing(false);
                    }, 100);
                  }}
                  className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-hover transition-all font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmailStatus({ sending: true, success: false, error: null });
                  
                  emailjs.send(
                    'service_89sdixq',
                    'template_ww814ql',
                    {
                      from_name: emailForm.name,
                      from_email: emailForm.email,
                      message: emailForm.message,
                      to_email: 'lebantinowin@gmail.com',
                    },
                    'lZfWFIu7y2Hb2-m1f'
                  )
                  .then(() => {
                    setEmailStatus({ sending: false, success: true, error: null });
                    setEmailForm({ name: '', email: '', message: '' });
                  })
                  .catch((error) => {
                    setEmailStatus({ sending: false, success: false, error: error.text });
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={emailForm.name}
                    onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-primary`}
                    required
                    disabled={emailStatus.sending}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-primary`}
                    required
                    disabled={emailStatus.sending}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                    required
                    disabled={emailStatus.sending}
                  />
                </div>
                {emailStatus.error && (
                  <div className="p-3 rounded-lg bg-red-500/20 text-red-500 text-sm">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    Failed to send email. Please try again.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={emailStatus.sending}
                  className="w-full py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {emailStatus.sending ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Send Email
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-800 py-8 px-5 text-center text-gray-600 dark:text-gray-400 font-medium">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
            <span className="text-primary font-semibold">
              {visitCount !== null ? visitCount.toLocaleString() : '...'} {t.visits}
            </span>
          </div>
          <p>&copy; 2026 My Portfolio. {t.footer}</p>
        </div>
      </footer>

      {/* Custom Cursor Dot */}
      <div 
        className="cursor-dot hidden md:block"
        style={{ 
          left: cursorPosition.x, 
          top: cursorPosition.y 
        }}
      />
      
      {/* Click Echo Effects */}
      {echoes.map(echo => (
        <div
          key={echo.id}
          className="cursor-echo hidden md:block"
          style={{
            left: echo.x,
            top: echo.y
          }}
        />
      ))}

      {/* Settings Button - Right Side */}
      <div className={`fixed right-8 ${showScrollTop ? 'bottom-24' : 'bottom-8'} z-50`}>
        <div className="relative flex items-center justify-center w-12 h-12">
          
          {/* Circular popup buttons - fan out radially */}
          {/* Theme Toggle Button (Straight Up) */}
          <div 
            className={`absolute transition-all duration-300 ease-out ${showSettings ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-50'}`}
            style={{ transform: showSettings ? 'translate(0, -65px)' : 'translate(0, 0)' }}
          >
            <button
              onClick={() => {
                toggleTheme();
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer group ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}></i>
            </button>
          </div>

          {/* Theme Color Button (Top Left) */}
          <div 
            className={`absolute transition-all duration-300 ease-out delay-75 ${showSettings ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-50'}`}
            style={{ transform: showSettings ? 'translate(-50px, -50px)' : 'translate(0, 0)' }}
          >
            <button
              onClick={() => {
                if (showGamePopup) { setIsGameClosing(true); setTimeout(() => { setShowGamePopup(false); setIsGameClosing(false); }, 100); }
                if (showLanguagePopup) {
                  setIsLanguageClosing(true);
                  setTimeout(() => {
                    setShowLanguagePopup(false);
                    setIsLanguageClosing(false);
                  }, 100);
                }
                if (showGamePopup) { setIsGameClosing(true); setTimeout(() => { setShowGamePopup(false); setIsGameClosing(false); }, 100); }
                if (showThemeColorPopup) {
                  setIsThemeColorClosing(true);
                  setTimeout(() => {
                    setShowThemeColorPopup(false);
                    setIsThemeColorClosing(false);
                  }, 100);
                } else {
                  setShowThemeColorPopup(true);
                }
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer group ${
                isDarkMode 
                  ? 'bg-primary text-white hover:brightness-110' 
                  : 'bg-primary text-white hover:brightness-90'
              }`}
              title="Change Theme Color"
            >
              <i className="fas fa-palette text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"></i>
            </button>
          </div>

          {/* Language Button (Straight Left) */}
          <div 
            className={`absolute transition-all duration-300 ease-out delay-150 ${showSettings ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-50'}`}
            style={{ transform: showSettings ? 'translate(-65px, 0)' : 'translate(0, 0)' }}
          >
            <button
              onClick={() => {
                if (showGamePopup) { setIsGameClosing(true); setTimeout(() => { setShowGamePopup(false); setIsGameClosing(false); }, 100); }
                if (showThemeColorPopup) {
                  setIsThemeColorClosing(true);
                  setTimeout(() => {
                    setShowThemeColorPopup(false);
                    setIsThemeColorClosing(false);
                  }, 100);
                }
                if (showGamePopup) { setIsGameClosing(true); setTimeout(() => { setShowGamePopup(false); setIsGameClosing(false); }, 100); }
                if (showLanguagePopup) {
                  setIsLanguageClosing(true);
                  setTimeout(() => {
                    setShowLanguagePopup(false);
                    setIsLanguageClosing(false);
                  }, 100);
                } else {
                  setShowLanguagePopup(true);
                }
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-all custom-cursor-pointer group ${
                isDarkMode 
                  ? 'bg-green-500 text-white hover:bg-green-400' 
                  : 'bg-green-500 text-white hover:bg-green-400'
              }`}
              title="Change Language"
            >
              <FontAwesomeIcon icon={faLanguage} className="text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </button>
          </div>

          {/* Game Button (Bottom Left) */}
          <div 
            className={`absolute transition-all duration-300 ease-out delay-[225ms] ${showSettings ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-50'}`}
            style={{ transform: showSettings ? 'translate(-50px, 50px)' : 'translate(0, 0)' }}
          >
            <button
              onClick={() => {
                if (showLanguagePopup) {
                  setIsLanguageClosing(true);
                  setTimeout(() => {
                    setShowLanguagePopup(false);
                    setIsLanguageClosing(false);
                  }, 100);
                }
                if (showThemeColorPopup) {
                  setIsThemeColorClosing(true);
                  setTimeout(() => {
                    setShowThemeColorPopup(false);
                    setIsThemeColorClosing(false);
                  }, 100);
                }
                if (showGamePopup) {
                  setIsGameClosing(true);
                  setTimeout(() => {
                    setShowGamePopup(false);
                    setIsGameClosing(false);
                  }, 100);
                } else {
                  setShowGamePopup(true);
                }
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-all custom-cursor-pointer group ${
                isDarkMode 
                  ? 'bg-purple-500 text-white hover:bg-purple-400' 
                  : 'bg-purple-500 text-white hover:bg-purple-400'
              }`}
              title="Play Games"
            >
              <i className="fas fa-gamepad text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"></i>
            </button>
          </div>

          {/* Main Settings Button */}
          <button
            onClick={() => {
              if (showSettings) {
                if (showLanguagePopup) {
                  setIsLanguageClosing(true);
                  setTimeout(() => {
                    setShowLanguagePopup(false);
                    setIsLanguageClosing(false);
                  }, 100);
                }
                if (showGamePopup) { 
                  setIsGameClosing(true); 
                  setTimeout(() => { 
                    setShowGamePopup(false); 
                    setIsGameClosing(false); 
                  }, 100); 
                }
                if (showThemeColorPopup) {
                  setIsThemeColorClosing(true);
                  setTimeout(() => {
                    setShowThemeColorPopup(false);
                    setIsThemeColorClosing(false);
                  }, 100);
                }
              }
              setShowSettings(!showSettings);
            }}
            aria-label="Settings"
            className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all custom-cursor-pointer group ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-gray-100' 
                : 'bg-black text-white hover:bg-gray-800'
            } ${showSettings ? 'rotate-90' : ''}`}
          >
            <i className="fas fa-cog text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"></i>
          </button>
        </div>
      </div>

      {/* Language Popup - positioned above the buttons on the right */}
      {showLanguagePopup && (
        <div className={`fixed right-8 ${showScrollTop ? 'bottom-40' : 'bottom-24'} z-[60] mb-2 ${isLanguageClosing ? 'animate-[popupSlideDown_0.1s_ease-in]' : 'animate-[popupSlideUp_0.1s_ease-out]'}`}>
          <div className={`rounded-2xl p-4 min-w-[180px] shadow-2xl origin-bottom-right ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Language</h3>
            <div className="space-y-1">
              {[
                { code: 'english', flag: 'https://flagcdn.com/w40/us.png', name: 'English' },
                { code: 'tagalog', flag: 'https://flagcdn.com/w40/ph.png', name: 'Tagalog' },
                { code: 'japanese', flag: 'https://flagcdn.com/w40/jp.png', name: 'Japanese' },
                { code: 'korean', flag: 'https://flagcdn.com/w40/kr.png', name: 'Korean' },
                { code: 'minion', flag: null, name: 'Minionese', icon: '🍌' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm custom-cursor-pointer ${
                    language === lang.code
                      ? 'bg-primary text-white'
                      : isDarkMode 
                        ? 'hover:bg-gray-700 text-white' 
                        : 'hover:bg-gray-100 text-black'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {lang.flag ? (
                      <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded-sm" />
                    ) : (
                      <span className="text-lg">{lang.icon}</span>
                    )}
                    <span>{lang.name}</span>
                  </span>
                  {language === lang.code && <i className="fas fa-check"></i>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Popup */}
      {showGamePopup && (
        <div className={`fixed right-8 ${showScrollTop ? 'bottom-40' : 'bottom-24'} z-[60] mb-2 ${isGameClosing ? 'animate-[popupSlideDown_0.1s_ease-in]' : 'animate-[popupSlideUp_0.1s_ease-out]'}`}>
          <div className={`rounded-2xl p-4 w-64 shadow-2xl origin-bottom-right ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Play Games</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'chess', name: 'Chess', icon: 'fas fa-chess' },
                { id: 'snake', name: 'Snake', icon: 'fas fa-staff-snake' },
                { id: 'space', name: 'Space Fighter', icon: 'fas fa-rocket' },
                { id: 'tictactoe', name: 'Tic Tac Toe', icon: 'fas fa-border-all' },
                { id: 'rps', name: 'Rock Paper Scissors', icon: 'fas fa-hand-scissors' },
                { id: 'more', name: 'More Coming...', icon: 'fas fa-ellipsis-h' }
              ].map((game) => (
                <button
                  key={game.id}
                  onClick={() => {
                    // Placeholder for game opening
                    alert(`${game.name} is coming soon!`);
                  }}
                  className={`w-full flex flex-col items-center justify-center p-3 rounded-xl transition-all custom-cursor-pointer group border ${
                    isDarkMode 
                      ? 'bg-gray-700/50 border-gray-600 hover:bg-purple-500 hover:border-purple-500 text-gray-300 hover:text-white' 
                      : 'bg-gray-50 border-gray-200 hover:bg-purple-500 hover:border-purple-500 text-gray-700 hover:text-white'
                  }`}
                  title={game.name}
                >
                  <i className={`${game.icon} text-2xl mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}></i>
                  <span className="text-[10px] font-bold text-center leading-tight">{game.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Theme Color Popup */}
      {showThemeColorPopup && (
        <div className={`fixed right-8 ${showScrollTop ? 'bottom-40' : 'bottom-24'} z-[60] mb-2 ${isThemeColorClosing ? 'animate-[popupSlideDown_0.1s_ease-in]' : 'animate-[popupSlideUp_0.1s_ease-out]'}`}>
          <div className={`rounded-2xl p-4 min-w-[200px] shadow-2xl origin-bottom-right ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Theme Color</h3>
            <div className="flex items-center gap-2 mb-3">
              {[
                { name: 'Blue', hex: '#3b82f6' },
                { name: 'Green', hex: '#22c55e' },
                { name: 'Red', hex: '#ef4444' },
                { name: 'Yellow', hex: '#eab308' },
              ].map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color.hex)}
                  className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex-shrink-0"
                  style={{
                    backgroundColor: color.hex,
                    borderColor: themeColor === color.hex ? (isDarkMode ? '#fff' : '#000') : 'transparent'
                  }}
                  title={color.name}
                />
              ))}
              <div 
                className={`relative w-8 h-8 rounded-full overflow-hidden border-2 flex-shrink-0 flex items-center justify-center transition-transform hover:scale-110`} 
                style={{ 
                  borderColor: isDarkMode ? '#4b5563' : '#d1d5db',
                  backgroundColor: isDarkMode ? '#374151' : '#f3f4f6'
                }}
              >
                <i className={`fas fa-eye-dropper text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}></i>
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  title="Custom Color"
                />
              </div>
            </div>
            <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
               <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current:</span>
               <span className={`font-mono text-sm uppercase font-bold`} style={{ color: themeColor }}>{themeColor}</span>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            isDarkMode={isDarkMode} 
            onClose={() => setSelectedProject(null)} 
            t={t} 
          />
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-primary to-secondary text-black rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 z-40 group"
            title="Scroll to top"
          >
            <i className="fas fa-chevron-up text-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"></i>
          </motion.button>
        )}
      </AnimatePresence>

      <WinBot isDarkMode={isDarkMode} />

      {/* Custom Cursor & Echoes */}
      <div 
        className="cursor-dot hidden md:block" 
        style={{ left: cursorPosition.x, top: cursorPosition.y }} 
      />
      {echoes.map(echo => (
        <div 
          key={echo.id} 
          className="cursor-echo" 
          style={{ left: echo.x, top: echo.y }} 
        />
      ))}
    </div>
  );
}

export default App;