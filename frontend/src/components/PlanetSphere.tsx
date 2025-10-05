import { motion } from 'framer-motion';

export function PlanetSphere() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main sphere with concentric circles */}
      <motion.svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-[600px] max-h-[600px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Outer glow */}
        <defs>
          <radialGradient id="sphereGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.1)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
          </radialGradient>
          <radialGradient id="sphereCore" cx="40%" cy="40%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="30%" stopColor="rgba(168, 85, 247, 0.15)" />
            <stop offset="70%" stopColor="rgba(168, 85, 247, 0.05)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.8)" />
          </radialGradient>
        </defs>

        {/* Glow background */}
        <circle cx="250" cy="250" r="240" fill="url(#sphereGlow)" opacity="0.5" />

        {/* Main sphere body */}
        <motion.circle
          cx="250"
          cy="250"
          r="180"
          fill="url(#sphereCore)"
          stroke="rgba(168, 85, 247, 0.4)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring' }}
        />

        {/* Concentric circles - horizontal */}
        {[0.3, 0.5, 0.7, 0.85, 0.95].map((scale, index) => (
          <motion.ellipse
            key={`h-${index}`}
            cx="250"
            cy="250"
            rx={180 * scale}
            ry={180 * scale * 0.3}
            fill="none"
            stroke={`rgba(168, 85, 247, ${0.4 - index * 0.05})`}
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
          />
        ))}

        {/* Concentric circles - vertical */}
        {[0.3, 0.5, 0.7, 0.85, 0.95].map((scale, index) => (
          <motion.ellipse
            key={`v-${index}`}
            cx="250"
            cy="250"
            rx={180 * scale * 0.3}
            ry={180 * scale}
            fill="none"
            stroke={`rgba(168, 85, 247, ${0.4 - index * 0.05})`}
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
          />
        ))}

        {/* Diagonal circles */}
        {[0.4, 0.6, 0.8].map((scale, index) => (
          <motion.ellipse
            key={`d1-${index}`}
            cx="250"
            cy="250"
            rx={180 * scale * 0.5}
            ry={180 * scale}
            fill="none"
            stroke={`rgba(168, 85, 247, ${0.25 - index * 0.04})`}
            strokeWidth="0.8"
            transform="rotate(45 250 250)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
          />
        ))}

        {[0.4, 0.6, 0.8].map((scale, index) => (
          <motion.ellipse
            key={`d2-${index}`}
            cx="250"
            cy="250"
            rx={180 * scale * 0.5}
            ry={180 * scale}
            fill="none"
            stroke={`rgba(168, 85, 247, ${0.25 - index * 0.04})`}
            strokeWidth="0.8"
            transform="rotate(-45 250 250)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
          />
        ))}

        {/* Inner detail lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.line
            key={`radial-${i}`}
            x1="250"
            y1="250"
            x2={250 + Math.cos((i * Math.PI) / 6) * 160}
            y2={250 + Math.sin((i * Math.PI) / 6) * 160}
            stroke={`rgba(168, 85, 247, 0.15)`}
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6] }}
            transition={{ duration: 2, delay: 0.8 + i * 0.05 }}
          />
        ))}

        {/* Center highlight */}
        <motion.circle
          cx="250"
          cy="250"
          r="8"
          fill="rgba(168, 85, 247, 0.6)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.circle
          cx="250"
          cy="250"
          r="4"
          fill="rgba(255, 255, 255, 0.8)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 1, delay: 1.1 }}
        />

        {/* Rotating outer ring */}
        <motion.circle
          cx="250"
          cy="250"
          r="180"
          fill="none"
          stroke="rgba(168, 85, 247, 0.3)"
          strokeWidth="1"
          strokeDasharray="5 10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '250px 250px' }}
        />
      </motion.svg>

      {/* Additional animated glow effects */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl" />
      </motion.div>
    </div>
  );
}
