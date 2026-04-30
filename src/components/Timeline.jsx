import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────── data ─────────────────── */
// ordered: most recent work first, then education (elementary → high school → college last)
const journeyData = [
  {
    id: 7,
    type: 'education',
    title: 'B.S. Information Technology',
    company: 'Ilocos Sur Polytechnic State College – Candon Campus',
    location: 'Candon City, Ilocos Sur',
    mapQuery: 'Ilocos+Sur+Polytechnic+State+Campus+Philippines',
    period: '2022 – 2026',
    icon: 'fas fa-graduation-cap',
    description: [
      'Graduated Cum Laude & Valedictorian.',
      'Awarded OJT of the Year, Web and Mobile Developer of the Year.',
      'Thesis: "Smart Hub for Adaptive Digital Engagement" — Best Abstract, Best Paper.',
    ],
  },
  {
    id: 1,
    type: 'work',
    title: 'Web Developer Intern',
    company: 'MoodLearning, Inc.',
    location: 'UP Diliman, Manila',
    mapQuery: 'UP+Diliman+Quezon+City+Manila+Philippines',
    period: 'Feb 2026 – Mar 2026',
    icon: 'fas fa-laptop-code',
    description: [
      'Enhanced UI design for Literature.ph, improving usability and visual appeal.',
      'Improved APIs to streamline data flow and integration.',
    ],
  },
  {
    id: 2,
    type: 'work',
    title: 'Freelancer — Digital Services',
    company: 'Self-employed',
    location: 'Candon City, Ilocos Sur',
    mapQuery: 'Candon+City+Ilocos+Sur+Philippines',
    period: 'Aug 2021 – Present',
    icon: 'fas fa-briefcase',
    description: [
      'Developed user-centric websites using HTML, CSS, JavaScript, and PHP.',
      'Created graphic designs, presentations, and managed a Facebook page.',
    ],
  },
  {
    id: 3,
    type: 'work',
    title: 'Manager',
    company: "Triple G's Water Refilling Station",
    location: 'Candon City, Ilocos Sur',
    mapQuery: 'Candon+City+Ilocos+Sur+Philippines',
    period: 'Jul 2022 – Aug 2023',
    icon: 'fas fa-store',
    description: [
      'Managed daily operations, ensuring efficient service and customer satisfaction.',
    ],
  },
  {
    id: 4,
    type: 'work',
    title: 'Waiter',
    company: "Francisca Francisco's Place",
    location: 'Candon City, Ilocos Sur',
    mapQuery: 'Candon+City+Ilocos+Sur+Philippines',
    period: 'Jul 2022 – Aug 2023',
    icon: 'fas fa-utensils',
    description: [
      'Provided excellent customer service in a fast-paced restaurant environment.',
    ],
  },
  {
    id: 6,
    type: 'education',
    title: 'Secondary Education (Junior & Senior High)',
    company: 'Sta. Lucia Academy',
    location: 'Santa Lucia, Ilocos Sur',
    mapQuery: 'Sta+Lucia+Academy+Santa+Lucia+Ilocos+Sur+Philippines',
    period: '2016 – 2022',
    icon: 'fas fa-school',
    description: [
      'Graduated With Distinction.',
      'Received Principal Commendation.',
    ],
  },
  {
    id: 5,
    type: 'education',
    title: 'Primary Education',
    company: 'Calongbuyan Elementary School',
    location: 'Candon City, Ilocos Sur',
    mapQuery: 'Calongbuyan+Elementary+School+Candon+City+Ilocos+Sur+Philippines',
    period: '2010 – 2016',
    icon: 'fas fa-child',
    description: [
      'Second Honorable Mention.',
    ],
  },
];

const typeColors = {
  work: {
    bg: 'rgba(var(--color-primary-rgb),0.08)',
    border: 'rgba(var(--color-primary-rgb),0.25)',
    dot: 'var(--color-primary)',
    accent: 'var(--color-primary)',
  },
  education: {
    bg: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.25)',
    dot: '#eab308',
    accent: '#eab308',
  },
};

/* ─────────────────── map preview popup (portal) ─────────────────── */
// Rendered via createPortal → always centred on the real viewport,
// regardless of any transform/stacking-context on ancestor elements.
function MapPopup({ item, isDarkMode, onClose }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${item.mapQuery}`;
  const embedUrl = `https://maps.google.com/maps?q=${item.mapQuery}&output=embed&z=15`;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="map-overlay"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black/65"
          style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl z-10"
          style={{
            background: isDarkMode ? '#111' : '#fff',
            border: isDarkMode ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.1)',
          }}
          initial={{ scale: 0.86, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.86, y: 24, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 440, damping: 28 }}
        >
          {/* header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <i className="fas fa-map-marker-alt text-red-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {item.company}
                </p>
                <p className={`text-[11px] truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {item.location}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`ml-3 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-white/10'
                  : 'text-gray-500 hover:text-black hover:bg-black/10'
              }`}
            >
              <i className="fas fa-times text-xs" />
            </button>
          </div>

          {/* map embed */}
          <div className="relative w-full" style={{ height: '230px' }}>
            <iframe
              title={`Map – ${item.company}`}
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* footer CTA */}
          <div className="p-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm text-white transition-all hover:brightness-90 active:scale-95"
              style={{ background: '#1a73e8' }}
            >
              <i className="fab fa-google" />
              Open in Google Maps
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ─────────────────── journey card (consistent for all) ─────────────────── */
function JourneyCard({ item, index, side, isDarkMode, onMapOpen }) {
  const colors = typeColors[item.type];
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="w-full"
    >
      <div
        className="p-5 rounded-2xl transition-shadow duration-300 hover:shadow-xl"
        style={{
          background: isDarkMode
            ? 'rgba(var(--color-primary-rgb),0.05)'
            : 'rgba(var(--color-primary-rgb),0.04)',
          border: `1px solid ${colors.border}`,
        }}
      >
        {/* header row */}
        <div className={`flex flex-wrap items-start gap-3 mb-2 ${side === 'left' ? 'md:flex-row-reverse' : ''}`}>
          {/* icon badge */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
          >
            <i className={`${item.icon} text-sm`} style={{ color: colors.accent }} />
          </div>

          <div className={`flex-1 min-w-0 ${side === 'left' ? 'md:text-right' : 'text-left'}`}>
            <h3 className={`text-sm md:text-base font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {item.title}
            </h3>
            {/* company — clickable map trigger */}
            <button
              onClick={onMapOpen}
              className={`group flex items-center gap-1 text-xs md:text-sm font-medium transition-colors hover:text-primary ${
                side === 'left' ? 'md:flex-row-reverse md:w-full md:justify-start' : ''
              } ${isDarkMode ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'}`}
              title={`View ${item.company} on map`}
            >
              <span className="group-hover:underline underline-offset-2 text-left">{item.company}</span>
              <i className="fas fa-location-dot text-[10px] opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: colors.accent }} />
            </button>
            
            {/* MOBILE period pill */}
            <div className={`mt-2 md:hidden ${side === 'left' ? 'flex justify-end' : 'flex justify-start'}`}>
              <span
                className="text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap inline-block"
                style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.accent }}
              >
                {item.period}
              </span>
            </div>
          </div>

          {/* DESKTOP period pill */}
          <span
            className="hidden md:inline-block text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap"
            style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.accent }}
          >
            {item.period}
          </span>
        </div>

        {/* location */}
        <p className={`text-xs mb-3 flex items-center gap-1 ${
          side === 'left' ? 'md:flex-row-reverse md:justify-start' : ''
        } ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          <i className="fas fa-map-marker-alt text-[10px]" />
          {item.location}
        </p>

        {/* bullets */}
        <ul className={`space-y-1.5 ${side === 'left' ? 'md:text-right' : 'text-left'}`}>
          {item.description.map((point, i) => (
            <li
              key={i}
              className={`flex items-start gap-2 text-xs md:text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } ${side === 'left' ? 'md:flex-row-reverse' : ''}`}
            >
              <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: colors.accent }} />
              <span className="flex-1 min-w-0">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─────────────────── item wrapper (manages popup state) ─────────────────── */
function JourneyItem({ item, index, side, isDarkMode }) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
      <JourneyCard item={item} index={index} side={side} isDarkMode={isDarkMode} onMapOpen={() => setMapOpen(true)} />

      {mapOpen && (
        <MapPopup item={item} isDarkMode={isDarkMode} onClose={() => setMapOpen(false)} />
      )}
    </>
  );
}

/* ─────────────────── main timeline ─────────────────── */
export default function Timeline({ isDarkMode }) {
  return (
    <div className="max-w-5xl mx-auto py-4">

      {/* ── DESKTOP: two-column landscape ── */}
      <div className="hidden md:block relative">
        {/* centre spine */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            background: 'linear-gradient(to bottom, var(--color-primary) 0%, #eab308 60%, transparent 100%)',
            opacity: 0.4,
          }}
        />

        <div className="space-y-10">
          {journeyData.map((item, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            const colors = typeColors[item.type];
            return (
              <div key={item.id} className="relative grid grid-cols-2 gap-0">
                {/* centre dot */}
                <div
                  className="absolute left-1/2 top-5 w-4 h-4 rounded-full -translate-x-1/2 z-10"
                  style={{
                    background: colors.dot,
                    boxShadow: `0 0 0 3px ${isDarkMode ? '#000' : '#fff'}, 0 0 12px ${colors.dot}88`,
                  }}
                />

                {/* left col */}
                <div className="pr-10 flex items-start justify-end">
                  {side === 'left' ? (
                    <JourneyItem item={item} index={index} side="left" isDarkMode={isDarkMode} />
                  ) : <div />}
                </div>

                {/* right col */}
                <div className="pl-10 flex items-start justify-start">
                  {side === 'right' ? (
                    <JourneyItem item={item} index={index} side="right" isDarkMode={isDarkMode} />
                  ) : <div />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE: portrait vertical ── */}
      <div className="md:hidden relative pl-8">
        {/* spine */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(to bottom, var(--color-primary) 0%, #eab308 60%, transparent 100%)',
            opacity: 0.5,
          }}
        />

        <div className="space-y-8">
          {journeyData.map((item, index) => {
            const colors = typeColors[item.type];
            return (
              <div key={item.id} className="relative">
                {/* dot */}
                <div
                  className="absolute -left-[39.5px] top-4 w-4 h-4 rounded-full z-10"
                  style={{
                    background: colors.dot,
                    boxShadow: `0 0 0 3px ${isDarkMode ? '#000' : '#fff'}, 0 0 10px ${colors.dot}88`,
                  }}
                />
                <JourneyItem item={item} index={index} side="right" isDarkMode={isDarkMode} />
              </div>
            );
          })}
        </div>
      </div>

      {/* legend */}
      <div className="flex justify-center gap-6 mt-12 text-xs font-semibold">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary inline-block" /> Work Experience
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" /> Education
        </span>
      </div>
    </div>
  );
}
