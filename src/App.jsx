import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Marquee from './components/Marquee';
import LoadingScreen from './components/LoadingScreen';

import ProjectModal from './components/ProjectModal';

import emailjs from '@emailjs/browser';
import WinBot from './components/WinBot';
import CustomCursor from './components/CustomCursor';
import ResumeModal from './components/ResumeModal';

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
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [activeSocialPopup, setActiveSocialPopup] = useState(null);
  const [socialPopupClosing, setSocialPopupClosing] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' });
  const [emailStatus, setEmailStatus] = useState({ sending: false, success: false, error: null });
  const [showShoulderFigures, setShowShoulderFigures] = useState(false);

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
      tagline: 'Web Developer | Mobile Developer',
      seeMyWork: 'Projects',
      downloadResume: 'Resume',
      aboutTitle: 'About Me',
      aboutP1: "I work mostly in full-stack web development — React, Laravel, and MySQL are my main tools.",
      aboutP2: "I care about building things that actually work and are easy to use. Whether it's a website, a design, or a system — I want it to solve a real problem.",
      aboutP3: "I’m currently available for full-time, remote or freelance work and am always open to new opportunities.",
      years: 'Years',
      projects: 'Projects',
      clients: 'Clients',
      happyClients: 'Happy Clients',
      featuredProjects: 'Projects',
      viewProject: 'View Project',
      letsWorkTogether: "Let's Work Together",
      workTogetherDesc: "I'm always interested in hearing about new projects and opportunities.",
      connect: 'Connect',
      footer: 'All rights reserved.',
      visits: 'visits',
      certifications: 'Certifications'
    },
    tagalog: {
      tagline: 'Web Developer | Mobile Developer | Manunulat',
      seeMyWork: 'Tingnan ang aking trabaho',
      downloadResume: 'I-download ang Resume',
      aboutTitle: 'Tungkol sa Akin',
      aboutP1: "Karamihan sa trabaho ko ay sa full-stack web development — React, Laravel, at MySQL ang aking mga pangunahing gamit.",
      aboutP2: "Mahalaga sa akin ang paggawa ng mga bagay na talagang gumagana at madaling gamitin. Maging ito man ay isang website, disenyo, o sistema — gusto kong may solusyon itong naibibigay sa totoong problema.",
      aboutP3: "Kasalukuyan akong available para sa full-time remote o freelance na trabaho at laging bukas sa mga bagong oportunidad.",
      years: 'Taon',
      projects: 'Mga Proyekto',
      clients: 'Mga Kliyente',
      happyClients: 'Masasayang Kliyente',
      featuredProjects: 'Mga Proyekto',
      viewProject: 'Tingnan ang Proyekto',
      letsWorkTogether: 'Tara, Magtrabaho Tayo',
      workTogetherDesc: 'Laging interesado akong makarinig tungkol sa bagong mga proyekto at oportunidad.',
      connect: 'Kumonekta',
      footer: 'Lahat ng karapatan ay nakalaan.',
      visits: 'mga bisita',
      certifications: 'Mga Sertipikasyon'
    },
    japanese: {
      tagline: 'Web開発者 | モバイル開発者 | 作家',
      seeMyWork: '作品を見る',
      downloadResume: '履歴書をダウンロード',
      aboutTitle: '自己紹介',
      aboutP1: '主にフルスタックWeb開発に携わっており、React、Laravel、MySQLをメインのツールとして使用しています。',
      aboutP2: '実際に機能し、使いやすいものを作ることを大切にしています。Webサイト、デザイン、システムのいずれであっても、現実の課題を解決するものでありたいと考えています。',
      aboutP3: '現在、フルタイムのリモートワークやフリーランスの案件を受け付けており、新しい機会を常に歓迎しています。',
      years: '年',
      projects: 'プロジェクト',
      clients: 'クライアント',
      happyClients: '満足のいくクライアント',
      featuredProjects: 'プロジェクト',
      viewProject: 'プロジェクトを見る',
      letsWorkTogether: '一緒に働きましょう',
      workTogetherDesc: '新しいプロジェクトや機会について常にお聞きしたいと思っています。',
      connect: '接続',
      footer: '全著作権所有。',
      visits: 'アクセス',
      certifications: '認定資格'
    },
    korean: {
      tagline: '웹 개발자 | 모바일 개발자 | 작가',
      seeMyWork: '내 작품 보기',
      downloadResume: '이력서 다운로드',
      aboutTitle: '소개',
      aboutP1: '저는 주로 풀스택 웹 개발을 합니다 — React, Laravel 및 MySQL이 제 주요 도구입니다.',
      aboutP2: '저는 실제로 작동하고 사용하기 쉬운 것을 만드는 데 관심이 있습니다. 웹사이트, 디자인 또는 시스템이든 — 실제 문제를 해결하기를 원합니다.',
      aboutP3: '현재 원격 또는 프리랜서 작업이 가능하며 새로운 기회에 항상 열려 있습니다.',
      years: '년',
      projects: '프로젝트',
      clients: '클라이언트',
      happyClients: '만족한 클라이언트',
      featuredProjects: '프로젝트',
      viewProject: '프로젝트 보기',
      letsWorkTogether: '함께 일합시다',
      workTogetherDesc: '새로운 프로젝트와 기회에 대해 듣는 것에 항상 관심이 있습니다.',
      connect: '연결',
      footer: '모든 권리 보유.',
      visits: '방문',
      certifications: '자격증'
    },
    minion: {
      tagline: 'Banana Developer | Banana Mobile',
      seeMyWork: 'See Banana Work',
      downloadResume: 'Download Banana',
      aboutTitle: 'About Me (Bello!)',
      aboutP1: 'Me mostly do full-stack web development — React, Laravel, and MySQL are me main bananas.',
      aboutP2: 'Me care about building things that actually work and easy to use. Website, design, or system — me want it to solve a real banana problem.',
      aboutP3: 'Me currently available for full-time remote or freelance work and always open to new banana opportunities.',
      years: 'Banana Years',
      projects: 'Banana Projects',
      clients: 'Banana Clients',
      happyClients: 'Happy Banana Clients',
      featuredProjects: 'Banana Projects',
      viewProject: 'View Banana Project',
      letsWorkTogether: 'Let\'s Work Banana Together!',
      workTogetherDesc: 'Me always interested in new banana projects and opportunities!',
      connect: 'Connect (Bello!)',
      footer: 'All banana rights reserved.',
      visits: 'minion visits',
      certifications: 'Banana Certifications'
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
      const sections = ['home', 'about', 'projects', 'certifications', 'contact'];
      const viewportCenter = window.innerHeight / 3;
      let currentSection = 'home';
      
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            currentSection = section;
            setActiveSection(section);
            break;
          }
        }
      }

      setShowScrollTop(currentSection === 'contact');
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

  // Delay the appearance of the angel/devil figures by 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShoulderFigures(true);
    }, 2000);
    return () => clearTimeout(timer);
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



  const projects = [
    {
      id: 1,
      title: 'Eccentri Tabulation System',
      description: 'A Laravel-based platform for managing competitive events with real-time judging and score tabulation. It streamlines the process of scoring contestants across multiple criteria, calculating weighted results, and generating live leaderboards.',
      date: 'Apr 2025 – Present',
      problem: 'Running competitive events manually is chaotic — scores get miscalculated, judges have inconsistent access, and results take hours to tabulate accurately under pressure.',
      solution: 'A role-based web platform where admins configure events and criteria, judges score in real-time through isolated portals, and weighted rankings are calculated and displayed instantly — eliminating human error and delays.',
      detailedDescription: "The Tabulation System is a comprehensive web application designed to manage events and their scoring processes. It provides three main interfaces:\n\nAdmin Dashboard: Administrators can create and manage events, define judging criteria with weightings, register contestants, assign judges, and oversee the entire judging process.\n\nJudge Portal: Judges securely access isolated event scoring interfaces where they can enter scores for contestants based on defined criteria. The system includes auto-save functionality to prevent data loss and prevents cross-event access for security.\n\nResults Portal: Displays live or completed event results with automatically calculated rankings based on weighted scores. Features include rank tabulation with tie-breaker support, the ability to override scores for adjustments, and public viewing of competition results.\n\nKey Features: Automated score weighting and rank calculation, tabulation override functionality for manual adjustments, audit logging for compliance, image support for contestants, and assistance request management to facilitate event operations.",
      tags: ['Laravel', 'Blade', 'PHP', 'Vite', 'Tailwind', 'MySQL'],
      github: 'https://github.com/lebantinowin/tabulation',
      image: '/Eccentri TS Screenshots/Screenshot 2026-05-04 194042.png',
      images: [
        '/Eccentri TS Screenshots/Screenshot 2026-05-04 194042.png',
        '/Eccentri TS Screenshots/Screenshot 2026-05-04 193333.png',
        '/Eccentri TS Screenshots/Screenshot 2026-05-04 193314.png',
        '/Eccentri TS Screenshots/488030332_640419532178826_2312955363910706476_n.jpg',
        '/Eccentri TS Screenshots/686201781_122127307233171555_7725823393787197059_n.jpg'
      ]
    },
    {
      id: 2,
      title: 'SpectaQR',
      description: 'A web-based attendance management system that uses QR code scanning to automatically track student/employee check-ins and check-outs across multiple time periods.',
      date: 'Aug 2025 – Oct 2025',
      problem: 'Manual attendance tracking in schools and organizations is slow, error-prone, and generates piles of paperwork that are hard to audit or report on.',
      solution: 'A QR code-powered attendance system where students scan in/out across multiple daily time windows, with automatic fine calculation, department analytics, and one-click PDF report exports.',
      detailedDescription: "Attendance System with QR Code Scanner is a comprehensive attendance tracking solution designed for educational institutions and organizations. The system automates attendance marking through QR code scanning, eliminating manual record-keeping and reducing errors.\n\nKey Features:\n\n- QR Code-Based Check-In/Out: Real-time attendance marking through QR code scanning with multiple time windows (morning in/out, afternoon in/out)\n- Multi-Department Support: Organize students/employees by departments with visual analytics showing department-wise distribution\n- Event Management: Create and manage attendance events with customizable time windows and fine rates for late arrivals\n- Student Management: Maintain comprehensive student records with ID numbers, department assignments, and attendance history\n- Attendance Tracking: Record attendance with automatic fine calculation based on configured late-arrival penalties\n- Administrative Dashboard: Visual analytics including event count, student count, department statistics, and attendance summaries\n- Reporting & Export: Generate and export attendance reports in PDF format with TCPDF and DOMPDF support\n- Access Control: Role-based authentication system with admin login for secure access to sensitive data\n- Excuse Management: Handle attendance excuses and special cases with fine confirmation workflows\n\nThe system solves the problem of manual, time-consuming attendance tracking by providing an automated, scalable, and accurate solution that integrates seamlessly into existing institutional workflows.",
      tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Endroid QR Code'],
      github: 'https://github.com/lebantinowin/attendance-system',
      image: '/SpectaQR Screenshots/Screenshot 2026-05-04 200705.png',
      images: [
        '/SpectaQR Screenshots/Screenshot 2026-05-04 200705.png',
        '/SpectaQR Screenshots/Screenshot 2026-05-04 200643.png',
        '/SpectaQR Screenshots/561761280_122200902206297650_7664125425968660942_n.jpg'
      ]
    },
    {
      id: 3,
      title: 'Warzone Gym CRM',
      description: 'A comprehensive web-based gym membership and fitness coaching platform. Developed for a Hackathon project with real clients.',
      date: 'Jan 5 – 9, 2025',
      problem: 'Small gyms struggle to retain members because they lack tools to track progress, send timely reminders, or provide personalized coaching — leading to drop-offs and low engagement.',
      solution: 'An AI-powered CRM where members get a personal coach, track workouts and mood, and receive smart notifications, while admins monitor engagement and communicate with members — all in one platform.',
      detailedDescription: "Warzone Gym CRM is an all-in-one fitness facility management system designed to revolutionize how gyms interact with their members. The platform serves both members and gym administrators with distinct, role-based interfaces.\n\n*Hackathon: Developed during a hackathon where the team selected real clients.*\n\nKey Features:\n\nMember Dashboard:\n- AI-Powered Coach: Personalized fitness coaching powered by Groq/Qwen AI with customizable coaching styles (harsh motivation, balanced, supportive)\n- Workout Tracking: Log and manage workouts with exercise details, sets, reps, and form notes; includes pagination and full workout history\n- Attendance Calendar: Interactive monthly calendar to mark attendance, log rest days, and track gym visits with attendance rate calculations\n- Mood & Journal: Digital fitness journal with mood check-ins, habit tracking, and entries that can be starred or archived for reflection\n- Real-Time Notifications: Contextual reminders for missed workouts, membership renewals, and progress milestones\n- Goal Progress Tracking: Visual goal progress indicators powered by AI confidence levels based on attendance and workout consistency\n- User Profile: Customizable fitness goals, profile pictures, and coaching preferences\n\nAdmin Dashboard:\n- Member Management: Full user administration, role management (member/admin), and member search\n- Reports & Analytics: Gym-wide statistics including total members, total workouts logged, average attendance rates, and activity trends\n- Activity Monitoring: Real-time tracking of all member activities, logins, and system interactions\n- Messaging System: Direct communication with members for announcements, feedback, and support\n- Feedback Management: Centralized feedback collection and status tracking (pending/resolved)\n- Administrative Reports: Detailed reports on gym usage, member engagement, and performance metrics\n\nCore Functionality:\nSecure authentication, role-based access control, real-time AJAX interactions, customizable AI coaching, and a responsive Tailwind CSS dark theme.",
      tags: ['PHP', 'HTML5', 'CSS', 'JavaScript', 'Tailwind', 'Groq API', 'MySQL'],
      github: 'https://github.com/lebantinowin/warzone',
      image: '/Warzone Screesnshots/Screenshot 2026-05-08 075815.png',
      images: [
        '/Warzone Screesnshots/Screenshot 2026-05-08 075815.png',
        '/Warzone Screesnshots/Screenshot 2026-05-08 075950.png',
        '/Warzone Screesnshots/Screenshot 2026-05-08 080013.png',
        '/Warzone Screesnshots/Screenshot 2026-05-08 080113.png',
        '/Warzone Screesnshots/610635729_1811623392827404_5329899526018116754_n.jpg',
        '/Warzone Screesnshots/611285996_882193690964185_1339562058082809289_n.jpg'
      ]
    }
  ];

  const certificationsList = [
    {
      id: 1,
      title: "Junior React Developer",
      issuer: "certificates.dev",
      date: "2026",
      pdf: "https://certificates.dev/c/a1968457-2c13-44e1-b7a5-032486117553",
      icon: "https://skillicons.dev/icons?i=react",
      image: "/react-cert.svg"
    },
    {
      id: 2,
      title: "Junior Laravel Developer",
      issuer: "certificates.dev",
      date: "2026",
      pdf: "https://certificates.dev/c/a1b457d9-b744-41e9-ad5f-4673bf5d6dbe",
      icon: "https://skillicons.dev/icons?i=laravel",
      image: "/laravel-cert.svg"
    }
  ];

  const frontRow = [
    { src: 'https://skillicons.dev/icons?i=html', label: 'HTML5' },
    { src: 'https://skillicons.dev/icons?i=css', label: 'CSS3' },
    { src: 'https://skillicons.dev/icons?i=js', label: 'JavaScript' },
    { src: 'https://skillicons.dev/icons?i=tailwind', label: 'Tailwind' },
    { src: 'https://skillicons.dev/icons?i=php', label: 'PHP' },
    { src: 'https://skillicons.dev/icons?i=mysql', label: 'MySQL' },
  ];

  const backRow = [
    { src: 'https://skillicons.dev/icons?i=laravel', label: 'Laravel' },

    { src: 'https://skillicons.dev/icons?i=ts', label: 'TypeScript' },
    { src: 'https://skillicons.dev/icons?i=vite', label: 'Vite' },
    { src: 'https://skillicons.dev/icons?i=nodejs', label: 'Node.js' },
    { src: 'https://skillicons.dev/icons?i=express', label: 'Express' },
  ];

  return (
    <div className="font-poppins bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 custom-cursor">
      <div className="noise-overlay"></div>
      
      {/* Theme Toggle Pill */}
      <button
        onClick={toggleTheme}
        className={`fixed z-[100] flex items-center justify-between w-[64px] h-[32px] px-1 rounded-full bg-gray-200 dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#2a2a2a] transition-all duration-300 hover:scale-105 shadow-sm
          left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 md:top-6 md:opacity-100 md:pointer-events-auto md:scale-100
          ${activeSection !== 'home' ? 'top-[50px] opacity-0 pointer-events-none scale-90' : 'top-[72px] opacity-100 pointer-events-auto scale-100'}
        `}
        aria-label="Toggle Theme"
      >
        <div 
          className="absolute w-[24px] h-[24px] rounded-full bg-white dark:bg-[#333333] shadow-sm transition-transform duration-300 ease-out"
          style={{ transform: isDarkMode ? 'translateX(0px)' : 'translateX(30px)' }}
        ></div>
        <i className={`fas fa-moon text-[12px] z-10 transition-colors duration-300 w-[24px] text-center ${isDarkMode ? 'text-white' : 'text-gray-400'}`}></i>
        <i className={`fas fa-sun text-[12px] z-10 transition-colors duration-300 w-[24px] text-center ${!isDarkMode ? 'text-gray-700' : 'text-[#666666]'}`}></i>
      </button>
      
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
      <section id="home" className="relative scroll-mt-24 min-h-[85vh] flex flex-col justify-center items-center px-5 bg-transparent pt-24 md:pt-16 pb-12 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-center gap-0 md:gap-16">
          
          {/* Left Column: Picture */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full mt-6 md:mt-0">
            <motion.div
              className="relative inline-block w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/win.svg"
                alt="Win Logo"
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
                }}
                className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[750px] h-auto mx-auto object-contain drop-shadow-2xl -mb-4 md:mb-0 relative z-10"
              />
              
              {/* Angel (Frontend) - Left */}
              <AnimatePresence>
                {showShoulderFigures && (
                  <motion.div
                    className="absolute top-[25%] sm:top-[20%] left-0 sm:left-4 md:-left-4 z-20 flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      opacity: { duration: 0.5 },
                      y: { repeat: Infinity, duration: 3, ease: "easeInOut" } 
                    }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-blue-500 font-black text-[10px] sm:text-xs tracking-widest whitespace-nowrap">FRONTEND!</span>
                    <img src="/angel.svg" alt="Frontend Angel" className="w-20 sm:w-28 md:w-32 h-auto drop-shadow-xl" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Devil (Backend) - Right */}
              <AnimatePresence>
                {showShoulderFigures && (
                  <motion.div
                    className="absolute top-[25%] sm:top-[20%] right-0 sm:right-4 md:-right-4 z-20 flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      opacity: { duration: 0.5 },
                      y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 } 
                    }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-red-500 font-black text-[10px] sm:text-xs tracking-widest whitespace-nowrap">BACKEND!</span>
                    <img src="/devil.svg" alt="Backend Devil" className="w-20 sm:w-28 md:w-32 h-auto drop-shadow-xl" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
        </div>

        {/* Right Column: Text */}
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full mt-0 md:mt-12">
          <motion.h1 
            className="relative z-10 text-5xl md:text-7xl font-black mb-2 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {greeting}&nbsp;I'm <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Win</span>
        </motion.h1>
        <motion.p 
          className={`relative z-10 text-sm sm:text-base md:text-2xl whitespace-nowrap ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-5 max-w-2xl font-light`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t.tagline}
        </motion.p>
        <motion.div 
          className="relative z-10 flex flex-wrap gap-3 sm:gap-4 justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('projects');
              if (el) {
                const isMobile = window.innerWidth < 768;
                const offset = isMobile ? -10 : 40;
                const y = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-full border-2 border-primary text-white bg-primary-hover hover:bg-primary-hover transition-all font-semibold"
          >
            <i className="fas fa-arrow-right text-xs"></i> 
            <span className="hidden sm:inline">Explore Projects</span>
            <span className="inline sm:hidden">Projects</span>
          </a>
          <button onClick={() => setShowResumeModal(true)} className="inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-full border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-black transition-all font-semibold">
            <i className="fas fa-file-pdf text-xs"></i> 
            <span className="hidden sm:inline">View Resume</span>
            <span className="inline sm:hidden">Resume</span>
          </button>
        </motion.div>

        <motion.div 
          className="relative z-10 block md:hidden mt-8 mb-8 animate-bounce w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span className="text-gray-500 text-[10px] whitespace-nowrap tracking-widest uppercase">Scroll to explore</span>
        </motion.div>

        {/* Tech Stack inside Hero */}
        <div className="relative z-10 w-full mt-2 md:mt-8 max-w-[65vw] md:max-w-xs mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="mb-3">
              <Marquee items={frontRow} speed={60} />
            </div>
            <div className="mb-3">
              <Marquee items={backRow} speed={48} reverse />
            </div>
          </motion.div>
        </div>

        </div>
        </div>

        <motion.div 
          className="relative z-10 hidden md:block mt-8 mb-4 animate-bounce w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <span className="text-gray-500 text-[10px] whitespace-nowrap tracking-widest uppercase">Scroll to explore</span>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 py-20 px-5 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <i className="fas fa-user-circle text-primary mr-2"></i> {t.aboutTitle}
          </h2>
          
          {/* Centered Paragraphs */}
          <div className="space-y-6 mb-20 text-center">
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed`}>
              {t.aboutP1}
            </p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed`}>
              {t.aboutP2}
            </p>
            {t.aboutP3 && (
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg leading-relaxed`}>
                {t.aboutP3}
              </p>
            )}
          </div>

          {/* Certifications Subsection */}
          <div className="mb-20">
            <h3 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              <i className="fas fa-certificate text-primary mr-2"></i> {t.certifications}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {certificationsList.map(cert => (
                <div
                  key={cert.id}
                  className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {cert.image && (
                    <div className="w-full border-b border-gray-100 dark:border-gray-800 overflow-hidden">
                      <img src={cert.image} alt={cert.title} className="w-full h-auto block transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6 flex items-center gap-4 flex-grow">
                    {cert.icon && (
                      <div className="w-12 h-12 shrink-0 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                        <img src={cert.icon} alt={cert.title} loading="lazy" className="w-6 h-6 object-contain drop-shadow-md" />
                      </div>
                    )}
                    <div>
                      <a
                        href={cert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-base font-bold mb-1 leading-tight hover:underline underline-offset-2 ${isDarkMode ? 'text-white hover:text-primary' : 'text-black hover:text-primary'}`}
                      >
                        {cert.title}
                      </a>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-primary' : 'text-primary-hover'}`}>{cert.issuer}</p>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}><i className="far fa-calendar-alt mr-1"></i>{cert.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center px-4">
              <a 
                href="https://drive.google.com/drive/folders/1frL2z-wbgw1D-Yhp4h5MyPeU6T8sjS1f?usp=drive_link" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-block text-sm font-medium transition-colors hover:underline ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
              >
                Explore my other Certificates and Achievements&nbsp;<i className="fas fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>

          {/* My Teams Subsection */}
          <div>
            <h3 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              <i className="fas fa-users text-primary mr-2"></i> My Teams
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* ECCENTRI */}
              <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group">
                <img src="/ECCENTRI.svg" alt="ECCENTRI" loading="lazy" className="w-24 h-24 mb-6 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>ECCENTRI</h4>
                <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  <i className="fas fa-crown"></i> Founder & Leader
                </div>
                <p className={`text-sm mb-6 flex-grow leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Eccentri is an Information Technology Solutions which their service expertise is Tabulation Service, Live Coverage/Streaming, and Photography.
                </p>
                <a 
                  href="https://www.facebook.com/profile.php?id=61585146655957" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-black transition-all font-semibold text-sm"
                >
                  <i className="fab fa-facebook-f"></i> Visit Page
                </a>
              </div>

              {/* NEXUS LEAGUE */}
              <div className="bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group">
                <img src="/NEXUSLEAGUE.svg" alt="NEXUS LEAGUE" loading="lazy" className="w-24 h-24 mb-6 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>NEXUS LEAGUE</h4>
                <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  <i className="fas fa-crown"></i> Founder & Leader
                </div>
                <p className={`text-sm mb-6 flex-grow leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Nexus League is a dynamic community of multimedia and gaming enthusiasts, founded on a shared passion for multimedia and competitive gaming.
                </p>
                <a 
                  href="https://www.facebook.com/profile.php?id=100086407458832" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-black transition-all font-semibold text-sm"
                >
                  <i className="fab fa-facebook-f"></i> Visit Page
                </a>
              </div>
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
          <div 
            className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory pb-8 -mx-5 px-5 md:mx-0 md:px-0 md:pb-0 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map(project => (
              <div
                key={project.id}
                className="w-[85vw] sm:w-[350px] md:w-auto shrink-0 snap-center bg-primary/5 border border-gray-800 rounded-xl hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {project.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                )}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <h3 className={`text-lg md:text-xl font-bold mb-2 md:mb-3 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'} text-sm md:text-base mb-3 md:mb-4 leading-relaxed line-clamp-3`}>{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="bg-primary/20 text-secondary text-xs font-semibold px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSelectedProject(project)} 
                    className="mt-auto self-start inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/70 transition-all duration-200"
                  >
                    View Project
                    <i className="fas fa-arrow-up-right-from-square text-[10px]"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Swipe Indicator */}
          <div className="md:hidden flex justify-center mt-4">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-black/5 text-gray-600'}`}>
              <i className="fas fa-chevron-left text-[10px] opacity-40"></i>
              <span className="text-xs font-medium tracking-wide">Swipe to explore</span>
              <i className="fas fa-chevron-right text-[10px] opacity-80 animate-pulse"></i>
            </div>
          </div>
        </div>
      </section>




      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 py-20 px-5 bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            <i className="fas fa-envelope text-primary mr-2"></i> Contact
          </h2>
          
          <div className="max-w-xl mx-auto">
            {/* Email Form Card */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-xl mx-auto mb-3">
                  <i className="fas fa-paper-plane"></i>
                </div>
                <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Send Email</h4>
                <p className="text-primary font-medium text-sm">lebantinowin@gmail.com</p>
              </div>

              {emailStatus.success ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>Message Sent!</h3>
                  <p className="text-gray-500 mb-6 text-sm">I'll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setEmailStatus({ sending: false, success: false, error: null })}
                    className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-all"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEmailStatus({ sending: true, success: false, error: null });
                    emailjs.send('service_89sdixq', 'template_ww814ql', {
                      from_name: emailForm.name,
                      from_email: emailForm.email,
                      message: emailForm.message,
                      to_email: 'lebantinowin@gmail.com',
                    }, 'lZfWFIu7y2Hb2-m1f')
                    .then(() => setEmailStatus({ sending: false, success: true, error: null }))
                    .catch((err) => setEmailStatus({ sending: false, success: false, error: err.text }));
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'} focus:outline-none focus:ring-2 focus:ring-primary`}
                    value={emailForm.name}
                    onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'} focus:outline-none focus:ring-2 focus:ring-primary`}
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({...emailForm, email: e.target.value})}
                  />
                  <textarea
                    placeholder="Your Message"
                    required
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'} focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                    value={emailForm.message}
                    onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                  />
                  <button
                    type="submit"
                    disabled={emailStatus.sending}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {emailStatus.sending ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                    Send Email
                  </button>
                </form>
              )}
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
      <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400">
          
          {/* Row 1: Connect & Socials */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <i className="fas fa-share-nodes text-primary text-[10px]"></i>
              <span className="font-bold uppercase tracking-widest text-[9px]">Connect</span>
            </div>
            <div className="flex items-center gap-5">
              {[
                { id: 'linkedin', icon: 'fab fa-linkedin-in' },
                { id: 'github', icon: 'fab fa-github' },
                { id: 'youtube', icon: 'fab fa-youtube' },
                { id: 'facebook', icon: 'fab fa-facebook-f' },
                { id: 'tiktok', icon: 'fab fa-tiktok' }
              ].map((social) => (
                <button
                  key={social.id}
                  onClick={() => setActiveSocialPopup(social.id)}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  <i className={social.icon + " text-base"}></i>
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Copyright */}
          <div className="hidden lg:block w-px h-4 bg-gray-300 dark:bg-gray-800" />
          
          <div className="flex flex-col items-center gap-1.5">
            <p className="opacity-80 text-center tracking-wide">&copy; 2026 Win Lebantino. {t.footer}</p>
            <p className="text-xs opacity-60 flex items-center gap-1.5">
              Built with <i className="fab fa-react text-[#61DAFB]"></i> React & <i className="fab fa-css3-alt text-[#38B2AC]"></i> Tailwind
            </p>
          </div>

          {/* Row 3: Visits & Settings */}
          <div className="hidden lg:block w-px h-4 bg-gray-300 dark:bg-gray-800" />
          
          <div className="flex items-center justify-center gap-8 lg:gap-6">
            <div className="flex items-center gap-2">
              <i className="fas fa-eye text-primary opacity-70"></i>
              <span>{visitCount !== null ? visitCount.toLocaleString() : '...'} {t.visits}</span>
            </div>
            
            <div className="relative flex items-center gap-3">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className={`hover:text-primary transition-all cursor-pointer text-sm ${showSettings ? 'rotate-90 text-primary' : ''}`}
                title="Settings"
              >
                <i className="fas fa-cog"></i>
              </button>
              <AnimatePresence>
                {showSettings && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-full ml-4 flex items-center gap-4 border-l border-gray-200 dark:border-gray-800 pl-4 z-50 whitespace-nowrap bg-white dark:bg-black py-1"
                  >
                    <button onClick={() => setShowThemeColorPopup(true)} className="hover:text-primary transition-colors cursor-pointer" title="Theme Color">
                      <i className="fas fa-palette"></i>
                    </button>
                    <button onClick={() => setShowLanguagePopup(true)} className="hover:text-primary transition-colors cursor-pointer" title="Change Language">
                      <i className="fas fa-language"></i>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
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



      {/* Language Popup - positioned above the buttons on the right */}
      {showLanguagePopup && (
        <div className={`fixed right-8 ${showScrollTop ? 'bottom-40' : 'bottom-24'} z-[60] mb-2 ${isLanguageClosing ? 'animate-[popupSlideDown_0.1s_ease-in]' : 'animate-[popupSlideUp_0.1s_ease-out]'}`}>
          <div className={`rounded-2xl p-4 min-w-[180px] shadow-2xl origin-bottom-right relative ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <button 
              onClick={() => {
                setIsLanguageClosing(true);
                setTimeout(() => {
                  setShowLanguagePopup(false);
                  setIsLanguageClosing(false);
                }, 100);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-times text-xs opacity-50"></i>
            </button>
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
          <div className={`rounded-2xl p-4 w-64 shadow-2xl origin-bottom-right relative ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <button 
              onClick={() => {
                setIsGameClosing(true);
                setTimeout(() => {
                  setShowGamePopup(false);
                  setIsGameClosing(false);
                }, 100);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-times text-xs opacity-50"></i>
            </button>
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
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theme Color Popup */}
      {showThemeColorPopup && (
        <div className={`fixed right-8 ${showScrollTop ? 'bottom-40' : 'bottom-24'} z-[60] mb-2 ${isThemeColorClosing ? 'animate-[popupSlideDown_0.1s_ease-in]' : 'animate-[popupSlideUp_0.1s_ease-out]'}`}>
          <div className={`rounded-2xl p-4 w-64 shadow-2xl origin-bottom-right relative ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <button 
              onClick={() => {
                setIsThemeColorClosing(true);
                setTimeout(() => {
                  setShowThemeColorPopup(false);
                  setIsThemeColorClosing(false);
                }, 100);
              }}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-times text-xs opacity-50"></i>
            </button>
            <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Theme Color</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[
                '#FF3366', '#00F2FE', '#7000FF', '#FFB800', '#00FF85',
                '#FF6B6B', '#4ECDC4', '#A55EEA', '#F7B731', '#26DE81',
                '#EB4D4B', '#22A6B3', '#686DE0', '#F0932B', '#7ED6DF'
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${themeColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
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
            className="fixed bottom-20 right-6 w-10 h-10 bg-primary text-black rounded-full flex items-center justify-center shadow-xl z-40 group"
            title="Scroll to top"
          >
            <i className="fas fa-chevron-up transition-transform duration-300 group-hover:scale-110"></i>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50">
        <WinBot isDarkMode={isDarkMode} />
      </div>

      {/* Custom Cursor Component */}
      <CustomCursor />

      {/* Resume Viewer Modal */}
      <ResumeModal 
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;