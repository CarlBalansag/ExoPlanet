import { motion } from 'framer-motion';
import { FormData } from './DataInputForm';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle2, TrendingDown, Activity } from 'lucide-react';
import { StarBackground } from './StarBackground';

interface ResultsDisplayProps {
  formData: FormData;
  modelResult?: { prediction: string; probability: number } | null;
}

export function ResultsDisplay({ formData, modelResult = null }: ResultsDisplayProps) {
  // Transit photometry calculations
  const calculateTransitDepth = () => {
    const flux = parseFloat(formData.flux);
    const depth = ((1 - flux) * 100).toFixed(4);
    return depth;
  };

  const calculateTransitQuality = () => {
    const flux = parseFloat(formData.flux);
    const depth = (1 - flux) * 100;
    
    if (depth > 0.5) return { quality: 'Excellent', score: 95, color: 'text-green-400' };
    if (depth > 0.1) return { quality: 'Good', score: 75, color: 'text-blue-400' };
    if (depth > 0.01) return { quality: 'Fair', score: 50, color: 'text-yellow-400' };
    return { quality: 'Poor', score: 25, color: 'text-red-400' };
  };

  const estimateRelativeSize = () => {
    const flux = parseFloat(formData.flux);
    const depth = (1 - flux) * 100;
    // Depth ≈ (Rp/Rs)^2 * 100
    const ratio = Math.sqrt(depth / 100);
    return (ratio * 100).toFixed(2);
  };

  const calculateOrbitalFrequency = () => {
    const period = parseFloat(formData.period);
    return (1 / period).toFixed(6);
  };

  const transitDepth = calculateTransitDepth();
  const transitQuality = calculateTransitQuality();
  const relativeSize = estimateRelativeSize();
  const orbitalFreq = calculateOrbitalFrequency();

  const metrics = [
    { 
      label: 'Transit Depth', 
      value: `${transitDepth}%`,
      description: 'Percentage of starlight blocked'
    },
    { 
      label: 'Relative Planet Size', 
      value: `${relativeSize}%`,
      description: 'Planet radius / Star radius (%)'
    },
    { 
      label: 'Orbital Frequency', 
      value: `${orbitalFreq} day⁻¹`,
      description: 'Orbits per day'
    },
    { 
      label: 'Transit Duration', 
      value: `${(parseFloat(formData.period) * 0.1).toFixed(2)} hours`,
      description: 'Estimated transit duration'
    },
  ];

  const GlassCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <div
        className="relative rounded-2xl p-[1px]"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.1))',
        }}
      >
        <div
          className="rounded-2xl h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9))',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-24 px-4 relative bg-black"
    >
      {/* Purple background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-3xl opacity-50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl text-center mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
        >
          Transit Analysis Results
        </motion.h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Photometric transit analysis and characterization
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transit Quality Assessment */}
          <GlassCard delay={0.2}>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-6 bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent text-center">
                Exoplanet Accuracy
              </h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
                    className={`text-6xl md:text-7xl mb-3 ${transitQuality.color}`}
                  >
                    {modelResult ? `${(modelResult.probability * 100).toFixed(2)}%` : '—'}
                  </motion.div>
                  <p className="text-gray-400">Detection Confidence</p>
                </div>
                
                <div 
                  className="mt-6 space-y-4 rounded-xl p-4 border"
                  style={{
                    background: 'rgba(168, 85, 247, 0.05)',
                    borderColor: 'rgba(168, 85, 247, 0.15)',
                  }}
                > 
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Planet Detected:</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-300" />
                      <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                        {modelResult ? modelResult.prediction : 'Unconfirmed'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Observation Data */}
          <GlassCard delay={0.4}>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-6 bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent text-center">
                Observation Parameters
              </h3>
              <div className="space-y-4">
                <div 
                  className="flex justify-between p-3 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white">{formData.time}</span>
                </div>
                <div 
                  className="flex justify-between p-3 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span className="text-gray-400">Flux:</span>
                  <span className="text-white">{formData.flux}</span>
                </div>
                <div 
                  className="flex justify-between p-3 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span className="text-gray-400">Period (days) </span>
                  <span className="text-white">{formData.period} days</span>
                </div>
                <div 
                  className="flex justify-between p-3 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span className="text-gray-400">Transit Epoch (T₀):</span>
                  <span className="text-white">{formData.t0}</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Additional Notes */}
          {formData.notes && (
            <GlassCard delay={0.5}>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl mb-4 text-white">
                  Research Notes
                </h3>
                <div 
                  className="p-4 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">{formData.notes}</p>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </motion.div>
    </div>
  );
}