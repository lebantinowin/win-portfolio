import React, { useRef, useState } from 'react';

// Marquee.jsx
export default function Marquee({ items = [], speed = 60, reverse = false, className = '' }) {
  const duration = `${(items.length * 120) / speed}s`;
  const copies = [...items, ...items, ...items, ...items];
  
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const getPageX = (e) => e.pageX || (e.touches && e.touches[0].pageX);

  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(getPageX(e) - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  
  const stopDrag = () => setIsDragging(false);
  
  const onDrag = (e) => {
    if (!isDragging) return;
    if (e.type.includes('mouse')) e.preventDefault();
    const x = getPageX(e) - trackRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={trackRef}
      className={`overflow-x-hidden relative ${className} cursor-grab active:cursor-grabbing`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); stopDrag(); }}
      onMouseDown={startDrag}
      onMouseUp={stopDrag}
      onMouseMove={onDrag}
      onTouchStart={startDrag}
      onTouchEnd={stopDrag}
      onTouchMove={onDrag}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className="flex w-max"
        style={{
          animation: `marquee-scroll-${items.length} ${duration} linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: isHovered || isDragging ? 'paused' : 'running',
        }}
      >
        {copies.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-2 mx-6 select-none"
            style={{ minWidth: '80px' }}
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-10 h-10 object-contain lazy-load"
              loading="lazy"
              draggable={false}
              style={{ pointerEvents: 'none' }}
            />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll-${items.length} {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </div>
  );
}
