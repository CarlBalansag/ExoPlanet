import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function StarBackground({ starCount = 300 }: { starCount?: number }) {
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.8,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      }));
      setStars(newStars);
    };
    generateStars();
  }, [starCount]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background:
              star.size > 1.5
                ? "rgba(168, 85, 247, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
            boxShadow:
              star.size > 1.5
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
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
