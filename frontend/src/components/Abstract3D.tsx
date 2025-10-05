import { motion } from 'framer-motion';

export function WireframeSphere({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Horizontal lines */}
      <ellipse cx="100" cy="100" rx="80" ry="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <ellipse cx="100" cy="100" rx="80" ry="60" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <ellipse cx="100" cy="100" rx="80" ry="40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <ellipse cx="100" cy="100" rx="80" ry="20" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      
      {/* Vertical lines */}
      <ellipse cx="100" cy="100" rx="80" ry="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <ellipse cx="100" cy="100" rx="60" ry="80" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      <ellipse cx="100" cy="100" rx="40" ry="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <ellipse cx="100" cy="100" rx="20" ry="80" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      
      {/* Center highlight */}
      <circle cx="100" cy="100" r="2" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

export function SmoothBlob({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>
      <path
        d="M100,20 C140,20 170,40 180,80 C190,120 180,160 140,180 C100,200 60,190 30,150 C0,110 10,60 40,35 C60,20 80,20 100,20 Z"
        stroke="url(#blobGradient)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M100,30 C135,30 160,48 168,82 C176,116 168,150 135,168 C102,186 68,178 42,145 C16,112 22,68 48,43 C64,28 82,30 100,30 Z"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export function TorusShape({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <ellipse cx="100" cy="100" rx="70" ry="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="60" ry="60" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      
      {/* Inner ring */}
      <ellipse cx="100" cy="100" rx="40" ry="40" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="30" ry="30" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      
      {/* Cross sections */}
      <path d="M 100 30 Q 120 100 100 170" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path d="M 30 100 Q 100 80 170 100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path d="M 100 30 Q 80 100 100 170" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path d="M 30 100 Q 100 120 170 100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    </svg>
  );
}
