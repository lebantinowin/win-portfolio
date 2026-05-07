import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M3 9.75L12 3l9 6.75V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.75z" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-7 9a7 7 0 1 1 14 0H5z" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.236-8 4.882-8-4.882V6l8 4.882L20 6v2.236z"/>
      </svg>
    ),
  },
];

const glassStyle = (isDarkMode) => ({
  background: isDarkMode ? 'rgba(10,10,10,0.80)' : 'rgba(255,255,255,0.80)',
  border: isDarkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  boxShadow: isDarkMode
    ? '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
    : '0 8px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)',
});

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const isMobile = window.innerWidth < 768;
  const offset = isMobile ? 72 : 0;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Sidebar({ isDarkMode, activeSection, setActiveSection, navSide = 'left', setNavSide }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [logoSpinning, setLogoSpinning] = useState(false);
  // Bumping this key remounts the nav logo → triggers spring bounce on return
  const [logoKey, setLogoKey] = useState(0);

  const handleLogoClick = () => {
    if (logoSpinning) return;
    setLogoSpinning(true);
    setTimeout(() => {
      setLogoSpinning(false);
      setLogoKey(k => k + 1); // triggers pop-bounce remount
    }, 2000);
  };

  const navItemStyle = (isActive, isHovered) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: isActive ? 'var(--color-primary)' : isHovered ? '#fff' : isDarkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
    background: isHovered ? '#000' : 'transparent',
    boxShadow: 'none',
    transform: isActive ? 'translateY(-1px)' : isHovered ? 'translateY(-0.5px)' : 'translateY(0)',
    cursor: 'pointer',
    textDecoration: 'none',
  });

  const topNav    = NAV_ITEMS.slice(0, 2);
  const bottomNav = NAV_ITEMS.slice(2);

  const tooltipStyle = (isHovered, isDarkMode) => ({
    position: 'absolute',
    left: navSide === 'right' ? 'auto' : 'calc(100% + 12px)',
    right: navSide === 'right' ? 'calc(100% + 12px)' : 'auto',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    padding: '4px 10px',
    borderRadius: '8px',
    color: isDarkMode ? '#fff' : '#111',
    background: isDarkMode ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? 'translateX(0px)' : (navSide === 'right' ? 'translateX(6px)' : 'translateX(-6px)'),
    transition: 'opacity 0.18s ease, transform 0.18s ease',
  });

  const handleNav = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    scrollToSection(id);
  };

  // The logo image element — reused in nav and overlay via layoutId
  const logoSrc = isDarkMode ? "/nav_logo_dark.svg" : "/nav_logo_light.svg";

  return (
    <>
      {/* ── Logo Spin Overlay ── */}
      <AnimatePresence>
        {logoSpinning && (
          <motion.div
            key="logo-overlay"
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Blurred backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: isDarkMode ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Standalone overlay logo: grows in, spins, shrinks out */}
            <motion.div
              className="relative z-10"
              style={{ originX: 0.5, originY: 0.5 }}
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ scale: 4, rotate: 720, opacity: 1 }}
              exit={{ scale: 0, rotate: 900, opacity: 0 }}
              transition={{
                scale:   { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
                rotate:  { duration: 1.6, ease: 'easeInOut' },
                opacity: { duration: 0.3 },
              }}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--color-primary)', filter: 'blur(24px)', opacity: 0.45 }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
              <img src={logoSrc} alt="Logo" className="relative w-9 h-9 object-contain drop-shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DESKTOP: vertical sidebar ── */}
      <aside
        className="group hidden md:flex fixed top-1/2 -translate-y-1/2 z-50"
        style={{
          left: navSide === 'right' ? 'calc(100vw - 68px)' : '20px',
          transition: 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(-50%)',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        
        {/* Switch Side Button */}
        {setNavSide && (
          <button
            onClick={() => setNavSide(navSide === 'right' ? 'left' : 'right')}
            className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 w-6 h-12 flex items-center justify-center bg-black/20 hover:bg-primary text-white rounded-full z-[-1] ${navSide === 'right' ? '-left-4' : '-right-4'}`}
            style={{ backdropFilter: 'blur(4px)' }}
            title={`Move to ${navSide === 'right' ? 'left' : 'right'}`}
          >
            <i className={`fas fa-chevron-${navSide === 'right' ? 'left' : 'right'} text-[10px]`}></i>
          </button>
        )}

        <div
          className="flex flex-col items-center gap-1 py-3 px-2"
          style={{ ...glassStyle(isDarkMode), borderRadius: '22px' }}
        >
          {topNav.map(({ id, label, icon }) => {
            const isActive  = activeSection === id;
            const isHovered = hoveredId === id;
            return (
              <div key={id} className="relative flex items-center">
                <span style={tooltipStyle(isHovered, isDarkMode)}>{label}</span>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNav(e, id)}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={navItemStyle(isActive, isHovered)}
                >
                  {icon}
                </a>
              </div>
            );
          })}

          {/* Logo — clickable, bounces back in when overlay closes */}
          <motion.div
            key={logoKey}
            style={{
              margin: '6px 0',
              cursor: 'pointer',
              // Hidden while overlay is active — no ghost double
              opacity: logoSpinning ? 0 : 1,
              pointerEvents: logoSpinning ? 'none' : 'auto',
            }}
            onClick={handleLogoClick}
            initial={logoKey > 0 ? { scale: 0, rotate: -30 } : false}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              scale:  { type: 'spring', stiffness: 520, damping: 16 },
              rotate: { type: 'spring', stiffness: 420, damping: 14 },
            }}
            title="Click me!"
          >
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <img src={logoSrc} alt="Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {bottomNav.map(({ id, label, icon }) => {
            const isActive  = activeSection === id;
            const isHovered = hoveredId === id;
            return (
              <div key={id} className="relative flex items-center">
                <span style={tooltipStyle(isHovered, isDarkMode)}>{label}</span>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleNav(e, id)}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={navItemStyle(isActive, isHovered)}
                >
                  {icon}
                </a>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ── MOBILE: compact floating pill ── */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-out" style={{ padding: '10px 16px' }} role="navigation" aria-label="Main navigation">
        <div
          className="flex items-center gap-1 scale-95 opacity-90 hover:scale-100 hover:opacity-100 transition-all duration-300"
          style={{ ...glassStyle(isDarkMode), borderRadius: '16px', padding: '5px 8px' }}
        >
          {topNav.map(({ id, icon, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNav(e, id)}
              aria-label={label}
              style={navItemStyle(activeSection === id, false)}
            >
              {icon}
            </a>
          ))}

          {/* Mobile logo — also clickable */}
          <motion.div
            key={`mobile-${logoKey}`}
            style={{
              margin: '0 4px',
              cursor: 'pointer',
              opacity: logoSpinning ? 0 : 1,
              pointerEvents: logoSpinning ? 'none' : 'auto',
            }}
            onClick={handleLogoClick}
            initial={logoKey > 0 ? { scale: 0, rotate: -30 } : false}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              scale:  { type: 'spring', stiffness: 520, damping: 16 },
              rotate: { type: 'spring', stiffness: 420, damping: 14 },
            }}
          >
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <img src={logoSrc} alt="Logo" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {bottomNav.map(({ id, icon, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNav(e, id)}
              aria-label={label}
              style={navItemStyle(activeSection === id, false)}
            >
              {icon}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}