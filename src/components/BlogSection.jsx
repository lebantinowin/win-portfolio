import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: "10 React Patterns You Should Know in 2026",
    excerpt: "Discover the most effective React design patterns that will make your codebase scalable and maintainable.",
    date: "April 15, 2026",
    readTime: "5 min read",
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Building Microservices with Node.js",
    excerpt: "A comprehensive guide to transitioning from a monolithic backend to a robust microservices architecture.",
    date: "March 28, 2026",
    readTime: "8 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "The Future of Web Animations",
    excerpt: "Exploring Framer Motion, GSAP, and native CSS features that are redefining web experiences.",
    date: "March 10, 2026",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop"
  }
];

export default function BlogSection({ isDarkMode }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <motion.article 
          key={article.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`group rounded-2xl overflow-hidden border transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-800 hover:shadow-primary/20' 
              : 'bg-white border-gray-200 hover:shadow-primary/10'
          }`}
        >
          <div className="relative h-48 overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {article.category}
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className={`flex items-center gap-3 text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className="flex items-center gap-1"><i className="far fa-calendar"></i> {article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><i className="far fa-clock"></i> {article.readTime}</span>
            </div>
            <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-black group-hover:text-primary transition-colors'}`}>
              {article.title}
            </h3>
            <p className={`mb-4 flex-grow line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {article.excerpt}
            </p>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-primary font-bold inline-flex items-center gap-2 group/link mt-auto">
              Read Article <i className="fas fa-arrow-right transform group-hover/link:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
