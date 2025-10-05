import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PlanetSphere } from './PlanetSphere';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { StarBackground } from './StarBackground';

export function HeroSection() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.3,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }));
      setStars(newStars);
    };
    generateStars();
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <StarBackground starCount={500} />
      {/* Dense starfield background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: star.size > 1.5 ? 'rgba(168, 85, 247, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              boxShadow: star.size > 1.5 
                ? `0 0 ${star.size * 3}px rgba(168, 85, 247, 0.6)` 
                : `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.4)`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Purple gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Main content - split layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 min-h-screen py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center h-full">
          {/* Left side - Planet Sphere */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center order-2 md:order-1"
          >
            <div className="w-full max-w-[500px] lg:max-w-[600px] aspect-square">
              <PlanetSphere />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col justify-center space-y-6 lg:space-y-8 order-1 md:order-2"
          >
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="inline-block px-4 py-2 rounded-full text-sm border backdrop-blur-sm"
              style={{
                background: 'rgba(168, 85, 247, 0.1)',
                borderColor: 'rgba(168, 85, 247, 0.3)',
                color: '#c084fc',
              }}
            >
              Nasa Space App Challenge
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span className="block text-white mb-3">Hunting for Exoplanets</span>
            <span 
              className="block bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 60px rgba(168, 85, 247, 0.4)',
              }}
            >
               with AI
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Discover the mysteries of worlds beyond our solar system. Analyze exoplanet data and explore the cosmic frontier with cutting-edge technology.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Button
              onClick={scrollToContent}
              size="lg"
              className="px-8 py-6 text-lg relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
                border: 'none',
                boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)',
              }}
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>

            <Button
              onClick={scrollToContent}
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-purple-500/40 text-white hover:bg-purple-500/10 backdrop-blur-sm"
            >
              Explore Data
            </Button>
          </motion.div>

        </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        onClick={scrollToContent}
      >
        <div 
          className="p-3 rounded-full border backdrop-blur-sm"
          style={{
            background: 'rgba(168, 85, 247, 0.05)',
            borderColor: 'rgba(168, 85, 247, 0.2)',
          }}
        >
          <ChevronDown className="w-6 h-6 text-purple-400" />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </div>
  );
}
