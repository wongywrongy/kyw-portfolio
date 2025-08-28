import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import { useMemo } from 'react'
import { useTheme } from '../contexts/ThemeContext'

// Sample blog posts data (in a real app, this would come from a CMS or API)
const blogPosts = [
  {
    id: 1,
    slug: 'machine-learning-autonomous-vehicles',
    title: "Machine Learning in Autonomous Vehicles",
    content: `
      <h2>Introduction</h2>
      <p>Autonomous vehicles represent one of the most exciting applications of machine learning in recent years. The combination of computer vision, sensor fusion, and deep learning has enabled remarkable progress in self-driving technology.</p>
      
      <h2>Key Technologies</h2>
      <p>The core of autonomous vehicle ML systems involves several key components:</p>
      <ul>
        <li><strong>Computer Vision:</strong> Processing camera feeds to identify objects, lanes, and traffic signs</li>
        <li><strong>Sensor Fusion:</strong> Combining data from LiDAR, radar, and cameras</li>
        <li><strong>Path Planning:</strong> Determining optimal routes while avoiding obstacles</li>
        <li><strong>Control Systems:</strong> Executing driving commands safely and smoothly</li>
      </ul>
      
      <h2>Recent Developments</h2>
      <p>Recent advances in transformer architectures and attention mechanisms have significantly improved the performance of autonomous driving systems. Companies like Tesla, Waymo, and Cruise have demonstrated impressive capabilities in complex urban environments.</p>
      
      <h2>Challenges and Future Directions</h2>
      <p>Despite significant progress, challenges remain in areas such as:</p>
      <ul>
        <li>Edge cases and rare scenarios</li>
        <li>Regulatory approval and safety certification</li>
        <li>Public trust and acceptance</li>
        <li>Infrastructure requirements</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Machine learning continues to drive innovation in autonomous vehicles, with new breakthroughs occurring regularly. The future of transportation looks increasingly automated, though significant challenges remain to be addressed.</p>
    `,
    category: "research",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["AI", "Autonomous Vehicles", "Machine Learning"],
    author: "Kyle Wong"
  },
  {
    id: 2,
    slug: 'future-web-development',
    title: "The Future of Web Development",
    content: `
      <h2>The Evolution of Web Technologies</h2>
      <p>Web development has evolved dramatically over the past decade, from simple static pages to complex, interactive applications that rival native software.</p>
      
      <h2>Modern Frameworks</h2>
      <p>Today's web development landscape is dominated by powerful frameworks and tools:</p>
      <ul>
        <li><strong>React:</strong> Component-based UI development</li>
        <li><strong>Vue.js:</strong> Progressive framework for building user interfaces</li>
        <li><strong>Next.js:</strong> Full-stack React framework</li>
        <li><strong>TypeScript:</strong> Type-safe JavaScript development</li>
      </ul>
      
      <h2>Emerging Trends</h2>
      <p>Several exciting trends are shaping the future of web development:</p>
      <ul>
        <li><strong>WebAssembly:</strong> Near-native performance in the browser</li>
        <li><strong>Progressive Web Apps:</strong> App-like experiences on the web</li>
        <li><strong>Serverless Architecture:</strong> Scalable, event-driven computing</li>
        <li><strong>AI Integration:</strong> Machine learning in web applications</li>
      </ul>
      
      <h2>Looking Ahead</h2>
      <p>As we look to the future, web development will continue to push boundaries in performance, user experience, and functionality. The line between web and native applications will continue to blur.</p>
    `,
    category: "blog",
    date: "2024-01-10",
    readTime: "5 min read",
    tags: ["Web Development", "Technology", "Frontend"],
    author: "Kyle Wong"
  },
  {
    id: 3,
    slug: 'optimizing-neural-networks-edge',
    title: "Optimizing Neural Networks for Edge Devices",
    content: `
      <h2>Introduction</h2>
      <p>Edge computing has become increasingly important as we move towards a more distributed computing paradigm. Optimizing neural networks for edge devices presents unique challenges and opportunities.</p>
      
      <h2>Challenges in Edge Deployment</h2>
      <p>Edge devices typically have limited computational resources, memory, and power. This requires careful optimization of neural network models:</p>
      <ul>
        <li><strong>Model Size:</strong> Reducing parameter count while maintaining accuracy</li>
        <li><strong>Computational Efficiency:</strong> Optimizing operations for specific hardware</li>
        <li><strong>Memory Usage:</strong> Minimizing RAM and storage requirements</li>
        <li><strong>Power Consumption:</strong> Reducing energy usage for battery-powered devices</li>
      </ul>
      
      <h2>Optimization Techniques</h2>
      <p>Several techniques have proven effective for edge optimization:</p>
      <ul>
        <li><strong>Quantization:</strong> Reducing precision from 32-bit to 8-bit or lower</li>
        <li><strong>Pruning:</strong> Removing unnecessary connections and neurons</li>
        <li><strong>Knowledge Distillation:</strong> Training smaller models from larger ones</li>
        <li><strong>Architecture Search:</strong> Automatically finding efficient architectures</li>
      </ul>
      
      <h2>Results and Impact</h2>
      <p>These optimizations can result in models that are 10-100x smaller while maintaining 90%+ of the original accuracy, making them suitable for deployment on edge devices.</p>
    `,
    category: "research",
    date: "2024-01-05",
    readTime: "12 min read",
    tags: ["Neural Networks", "Edge Computing", "Optimization"],
    author: "Kyle Wong"
  }
]

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { theme } = useTheme()

  // Find the post by slug
  const post = useMemo(() => {
    return blogPosts.find(p => p.slug === slug)
  }, [slug])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'research':
        return 'bg-blue-600 text-white'
      case 'blog':
        return 'bg-slate-600 text-white'
      case 'tutorial':
        return 'bg-emerald-600 text-white'
      case 'thoughts':
        return 'bg-amber-600 text-white'
      default:
        return 'bg-slate-500 text-white'
    }
  }

  if (!post) {
    return (
      <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'} mb-4`}>Post Not Found</h1>
          <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-400'} mb-6`}>The post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 px-4 py-2 ${theme === 'light' ? 'bg-slate-700 text-white' : 'bg-slate-700 text-slate-100'} rounded-lg hover:bg-slate-600 transition-all duration-200`}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'}`}>
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Post header with back button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            {/* Back button and title */}
            <div className="flex items-center gap-4 mb-6">
              <Link
                to="/blog"
                className="p-2 text-slate-400 hover:text-c3 transition-colors duration-200"
              >
                <ChevronLeft size={24} />
              </Link>
              <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-100'}`}>
                {post.title}
              </h1>
            </div>

            {/* Category badge and metadata */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(post.category)}`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <div className={`flex items-center gap-4 text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Author */}
            <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-300'} mb-6`}>By {post.author}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-sm ${theme === 'light' 
                    ? 'bg-slate-100 rounded-full text-slate-600 border border-slate-200' 
                    : 'bg-slate-700/50 rounded-full text-slate-300 border border-slate-600/30'
                  } flex items-center gap-1`}
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Post content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className={`prose prose-lg max-w-none ${
              theme === 'light' 
                ? 'prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800 prose-ul:text-slate-600 prose-li:text-slate-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-500' 
                : 'prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-slate-100 prose-ul:text-slate-300 prose-li:text-slate-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300'
            }`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back to blog button */}
          <motion.div
            className={`mt-12 pt-8 border-t ${theme === 'light' ? 'border-slate-300' : 'border-slate-700'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 px-6 py-3 ${theme === 'light' ? 'bg-slate-700 text-white' : 'bg-slate-700 text-slate-100'} rounded-lg hover:bg-slate-600 transition-all duration-200`}
            >
              <ArrowLeft size={16} />
              Back to Research & Blog
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
