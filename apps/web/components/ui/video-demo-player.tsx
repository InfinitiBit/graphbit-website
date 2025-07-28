import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface VideoDemoPlayerProps {
  videoId?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function VideoDemoPlayer({
  videoId = "dQw4w9WgXcQ", // Default YouTube video ID (Rick Roll as placeholder)
  title = "GraphBit Demo",
  description = "Watch how GraphBit transforms your AI agent development workflow",
  className = ""
}: VideoDemoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlayClick = () => {
    setIsLoaded(true);
  };

  return (
    <motion.div
      className={`relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-gray-900">
        {!isLoaded ? (
          // Thumbnail with Play Button
          <div className="relative w-full h-full">
            {/* Thumbnail Background */}
            <div 
              className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center"
              style={{
                backgroundImage: `url('https://img.youtube.com/vi/${videoId}/maxresdefault.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Play Button */}
              <motion.button
                onClick={handlePlayClick}
                className="relative z-10 flex items-center justify-center w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Play video"
              >
                                 <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
              </motion.button>
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-200 text-sm">{description}</p>
            </div>
          </div>
        ) : (
          // YouTube Embed
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Video Details */}
      <div className="bg-white dark:bg-gray-800 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {description}
            </p>
          </div>
          <motion.a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
                         <ArrowRight className="w-4 h-4" />
            Watch on YouTube
          </motion.a>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5min</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Quick Demo</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">Live</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Real Usage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Step-by-Step</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tutorial</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">Results</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">See Benefits</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 