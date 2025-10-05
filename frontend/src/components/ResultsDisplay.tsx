import { motion } from 'framer-motion';
import { FormData } from './DataInputForm';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ResultsDisplayProps {
  formData: FormData;
}

export function ResultsDisplay({ formData }: ResultsDisplayProps) {
  // Mock analysis calculations
  const calculateHabitabilityScore = () => {
    const tempScore = Math.max(0, 100 - Math.abs(parseFloat(formData.equilibriumTemp) - 288) * 2);
    const radiusScore = Math.max(0, 100 - Math.abs(parseFloat(formData.planetRadius) - 1) * 50);
    const massScore = Math.max(0, 100 - Math.abs(parseFloat(formData.planetMass) - 1) * 20);
    return Math.round((tempScore + radiusScore + massScore) / 3);
  };

  const calculateDensity = () => {
    const mass = parseFloat(formData.planetMass);
    const radius = parseFloat(formData.planetRadius);
    return ((mass / (radius ** 3)) * 5.51).toFixed(2);
  };

  const classifyPlanet = () => {
    const radius = parseFloat(formData.planetRadius);
    if (radius < 1.25) return 'Terrestrial';
    if (radius < 2) return 'Super-Earth';
    if (radius < 4) return 'Mini-Neptune';
    if (radius < 10) return 'Neptune-like';
    return 'Jupiter-like';
  };

  const assessHabitableZone = () => {
    const temp = parseFloat(formData.equilibriumTemp);
    if (temp >= 273 && temp <= 373) return { status: 'in', color: 'white' };
    if (temp >= 200 && temp <= 400) return { status: 'near', color: 'gray' };
    return { status: 'outside', color: 'gray' };
  };

  const habitabilityScore = calculateHabitabilityScore();
  const density = calculateDensity();
  const planetType = classifyPlanet();
  const habitableZone = assessHabitableZone();

  const metrics = [
    { 
      label: 'Surface Gravity', 
      value: `${((parseFloat(formData.planetMass) / (parseFloat(formData.planetRadius) ** 2))).toFixed(2)} g`,
      description: 'Relative to Earth'
    },
    { 
      label: 'Escape Velocity', 
      value: `${(11.2 * Math.sqrt(parseFloat(formData.planetMass) / parseFloat(formData.planetRadius))).toFixed(1)} km/s`,
      description: 'Minimum velocity to escape gravity'
    },
    { 
      label: 'Density', 
      value: `${density} g/cm³`,
      description: 'Bulk density'
    },
    { 
      label: 'Year Length', 
      value: `${parseFloat(formData.orbitalPeriod).toFixed(1)} days`,
      description: 'Orbital period around host star'
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
          Analysis Results
        </motion.h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Comprehensive analysis for {formData.planetName}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Habitability Score */}
          <GlassCard delay={0.2}>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-6 bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">
                Habitability Assessment
              </h3>
              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
                    className="text-6xl md:text-7xl mb-3 bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent"
                  >
                    {habitabilityScore}%
                  </motion.div>
                  <p className="text-gray-400">Habitability Score</p>
                </div>
                <Progress value={habitabilityScore} className="h-3" />
                
                <div 
                  className="mt-6 space-y-4 rounded-xl p-4 border"
                  style={{
                    background: 'rgba(168, 85, 247, 0.05)',
                    borderColor: 'rgba(168, 85, 247, 0.15)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Planet Classification:</span>
                    <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                      {planetType}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-purple-200">Habitable Zone:</span>
                    <div className="flex items-center gap-2">
                      {habitableZone.status === 'in' && <CheckCircle2 className="w-5 h-5 text-purple-300" />}
                      {habitableZone.status === 'near' && <AlertCircle className="w-5 h-5 text-purple-400" />}
                      {habitableZone.status === 'outside' && <XCircle className="w-5 h-5 text-purple-600" />}
                      <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
                        {habitableZone.status === 'in' ? 'Inside' : habitableZone.status === 'near' ? 'Nearby' : 'Outside'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Physical Properties */}
          <GlassCard delay={0.3}>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-6 text-white">
                Physical Properties
              </h3>
              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex justify-between items-start p-3 rounded-xl border hover:bg-white/5 transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div>
                      <div className="text-gray-300">{metric.label}</div>
                      <div className="text-sm text-gray-600">{metric.description}</div>
                    </div>
                    <div className="text-white">{metric.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Stellar Parameters */}
          <GlassCard delay={0.4}>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl mb-6 text-white">
                Host Star Analysis
              </h3>
              <div className="space-y-4">
                <div 
                  className="flex justify-between p-3 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span className="text-gray-400">Stellar Mass:</span>
                  <span className="text-white">{formData.stellarMass} M☉</span>
                </div>
                <div 
                  className="flex justify-between p-3 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span className="text-gray-400">Stellar Radius:</span>
                  <span className="text-white">{formData.stellarRadius} R☉</span>
                </div>
                <div 
                  className="flex justify-between p-3 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span className="text-gray-400">Stellar Temperature:</span>
                  <span className="text-white">{formData.stellarTemp} K</span>
                </div>
                <div 
                  className="flex justify-between p-3 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span className="text-gray-400">Distance from Earth:</span>
                  <span className="text-white">{formData.distance} ly</span>
                </div>
                <div 
                  className="flex justify-between items-center p-3 rounded-xl border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span className="text-gray-400">Discovery Method:</span>
                  <Badge className="bg-white/10 text-gray-300 border-white/20">
                    {formData.discoveryMethod}
                  </Badge>
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
  );
}
