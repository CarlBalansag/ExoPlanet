// imports
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

// star background component
function StarBackground({ starCount = 500 }) {
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// interfaces
interface DataInputFormProps {
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  time: string;
  flux: string;
  period: string;
  t0: string;
  notes: string;
}

interface ValidationErrors {
  time?: string;
  flux?: string;
  period?: string;
  t0?: string;
}

// main component
export default function DataInputForm({ onSubmit = (data) => console.log(data) }: Partial<DataInputFormProps>) {
  const [formData, setFormData] = useState<FormData>({
    time: '',
    flux: '',
    period: '',
    t0: '',
    notes: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const hasFourDifferentDigits = (value: string): boolean => {
    if (!value) return false;
    const digits = value.replace(/[^0-9]/g, '');
    const uniqueDigits = new Set(digits.split(''));
    return uniqueDigits.size >= 4;
  };

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    if (!value) return undefined;

    switch (field) {
      case 'time':
      case 'flux':
        if (!hasFourDifferentDigits(value)) {
          return 'Invalid number';
        }
        break;
      case 'period':
      case 't0':
        if (isNaN(Number(value)) || value.trim() === '') {
          return 'Invalid number';
        }
        break;
    }
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ValidationErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      if (field !== 'notes') {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof FormData) => {
    if (field !== 'notes' && formData[field]) {
      const error = validateField(field, formData[field]);
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 relative bg-black">
      <StarBackground starCount={500} />
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
                {['time', 'flux', 'period', 't0'].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="text-purple-200">
                      {field === 't0' ? 'T₀ (BJD)' : field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      id={field}
                      type="text"
                      value={formData[field as keyof FormData]}
                      onChange={(e) => handleChange(field as keyof FormData, e.target.value)}
                      onBlur={() => handleBlur(field as keyof FormData)}
                      placeholder={
                        field === 't0'
                          ? '1'
                          : field === 'period'
                          ? '67'
                          : '2454833, 67676767, 67, 6776'
                      }
                      className={`bg-white/5 border-white/10 text-white placeholder:text-purple-500/40 focus:border-purple-500/50 ${
                        errors[field as keyof ValidationErrors] ? 'border-red-500' : ''
                      }`}
                      aria-invalid={!!errors[field as keyof ValidationErrors]}
                      aria-describedby={`${field}-error`}
                      required
                    />
                    {errors[field as keyof ValidationErrors] && (
                      <p id={`${field}-error`} className="text-red-400 text-sm mt-1">
                        {errors[field as keyof ValidationErrors]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2 mt-6">
                <Label htmlFor="notes" className="text-purple-200">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Enter any additional observations or notes..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-purple-500/40 min-h-24 focus:border-purple-500/50"
                />
              </div>

              <motion.div className="mt-8" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
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
