import { motion } from 'framer-motion';
import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { StarBackground } from './StarBackground';

interface DataInputFormProps {
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  planetName: string;
  stellarMass: string;
  orbitalPeriod: string;
  planetRadius: string;
  planetMass: string;
  equilibriumTemp: string;
  discoveryMethod: string;
  stellarRadius: string;
  stellarTemp: string;
  distance: string;
  notes: string;
}

export function DataInputForm({ onSubmit }: DataInputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    planetName: '',
    stellarMass: '',
    orbitalPeriod: '',
    planetRadius: '',
    planetMass: '',
    equilibriumTemp: '',
    discoveryMethod: '',
    stellarRadius: '',
    stellarTemp: '',
    distance: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-24 px-4 relative bg-black">
      <StarBackground starCount={500} />
      {/* Purple background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-3xl opacity-50" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto relative z-10"
      >
        <motion.h2
          className="text-4xl md:text-6xl text-center mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Exoplanet Analysis Tool
        </motion.h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Enter planetary parameters to analyze habitability and characteristics
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div
            className="relative rounded-2xl p-[1px]"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.1))',
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9))',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Planet Name */}
                <div className="space-y-2">
                  <Label htmlFor="planetName" className="text-purple-200">Planet Name</Label>
                  <Input
                    id="planetName"
                    value={formData.planetName}
                    onChange={(e) => handleChange('planetName', e.target.value)}
                    placeholder="e.g., Kepler-452b"
                    className="glass-input text-white placeholder:text-gray-600"
                    required
                  />
                </div>

                {/* Stellar Mass */}
                <div className="space-y-2">
                  <Label htmlFor="stellarMass" className="text-purple-200">Stellar Mass (M☉)</Label>
                  <Input
                    id="stellarMass"
                    type="number"
                    step="0.01"
                    value={formData.stellarMass}
                    onChange={(e) => handleChange('stellarMass', e.target.value)}
                    placeholder="e.g., 1.04"
                    className="glass-input text-white placeholder:text-purple-500/40"
                    required
                  />
                </div>

                {/* Orbital Period */}
                <div className="space-y-2">
                  <Label htmlFor="orbitalPeriod" className="text-purple-200">Orbital Period (days)</Label>
                  <Input
                    id="orbitalPeriod"
                    type="number"
                    step="0.01"
                    value={formData.orbitalPeriod}
                    onChange={(e) => handleChange('orbitalPeriod', e.target.value)}
                    placeholder="e.g., 384.8"
                    className="glass-input text-white placeholder:text-purple-500/40"
                    required
                  />
                </div>

                {/* Planet Radius */}
                <div className="space-y-2">
                  <Label htmlFor="planetRadius" className="text-purple-200">Planet Radius (R⊕)</Label>
                  <Input
                    id="planetRadius"
                    type="number"
                    step="0.01"
                    value={formData.planetRadius}
                    onChange={(e) => handleChange('planetRadius', e.target.value)}
                    placeholder="e.g., 1.6"
                    className="glass-input text-white placeholder:text-purple-500/40"
                    required
                  />
                </div>

                {/* Planet Mass */}
                <div className="space-y-2">
                  <Label htmlFor="planetMass" className="text-purple-200">Planet Mass (M⊕)</Label>
                  <Input
                    id="planetMass"
                    type="number"
                    step="0.01"
                    value={formData.planetMass}
                    onChange={(e) => handleChange('planetMass', e.target.value)}
                    placeholder="e.g., 5.0"
                    className="glass-input text-white placeholder:text-purple-500/40"
                    required
                  />
                </div>

                {/* Equilibrium Temperature */}
                <div className="space-y-2">
                  <Label htmlFor="equilibriumTemp" className="text-purple-200">Equilibrium Temp (K)</Label>
                  <Input
                    id="equilibriumTemp"
                    type="number"
                    step="0.01"
                    value={formData.equilibriumTemp}
                    onChange={(e) => handleChange('equilibriumTemp', e.target.value)}
                    placeholder="e.g., 265"
                    className="glass-input text-white placeholder:text-purple-500/40"
                    required
                  />
                </div>

                {/* Discovery Method */}
                <div className="space-y-2">
                  <Label htmlFor="discoveryMethod" className="text-purple-200">Discovery Method</Label>
                  <Select value={formData.discoveryMethod} onValueChange={(value) => handleChange('discoveryMethod', value)} required>
                    <SelectTrigger className="glass-input text-white">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent 
                      className="border-white/10 bg-black/95"
                      style={{
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                      }}
                    >
                      <SelectItem value="transit">Transit</SelectItem>
                      <SelectItem value="radial-velocity">Radial Velocity</SelectItem>
                      <SelectItem value="direct-imaging">Direct Imaging</SelectItem>
                      <SelectItem value="microlensing">Microlensing</SelectItem>
                      <SelectItem value="timing">Timing Variations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Stellar Radius */}
                <div className="space-y-2">
                  <Label htmlFor="stellarRadius" className="text-purple-200">Stellar Radius (R☉)</Label>
                  <Input
                    id="stellarRadius"
                    type="number"
                    step="0.01"
                    value={formData.stellarRadius}
                    onChange={(e) => handleChange('stellarRadius', e.target.value)}
                    placeholder="e.g., 1.11"
                    className="glass-input text-white placeholder:text-purple-500/40"
                    required
                  />
                </div>

                {/* Stellar Temperature */}
                <div className="space-y-2">
                  <Label htmlFor="stellarTemp" className="text-purple-200">Stellar Temperature (K)</Label>
                  <Input
                    id="stellarTemp"
                    type="number"
                    step="1"
                    value={formData.stellarTemp}
                    onChange={(e) => handleChange('stellarTemp', e.target.value)}
                    placeholder="e.g., 5757"
                    className="glass-input text-white placeholder:text-purple-500/40"
                    required
                  />
                </div>

                {/* Distance */}
                <div className="space-y-2">
                  <Label htmlFor="distance" className="text-purple-200">Distance (light years)</Label>
                  <Input
                    id="distance"
                    type="number"
                    step="0.01"
                    value={formData.distance}
                    onChange={(e) => handleChange('distance', e.target.value)}
                    placeholder="e.g., 1400"
                    className="glass-input text-white placeholder:text-purple-500/40"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2 mt-6">
                <Label htmlFor="notes" className="text-purple-200">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Enter any additional observations or notes..."
                  className="glass-input text-white placeholder:text-purple-500/40 min-h-24"
                />
              </div>

              <motion.div 
                className="mt-8"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  className="w-full h-14 relative overflow-hidden border-0 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
                    boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)',
                  }}
                >
                  <span className="relative z-10">Analyze Exoplanet Data</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
