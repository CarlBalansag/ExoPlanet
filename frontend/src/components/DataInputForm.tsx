import { motion } from 'framer-motion';
import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

// Star background component
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
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

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

export default function DataInputForm({ onSubmit = (data) => console.log(data) }: Partial<DataInputFormProps>) {
  const [formData, setFormData] = useState<FormData>({
    time: '',
    flux: '',
    period: '',
    t0: '',
    notes: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: string; probability: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validation function to check if a number has at least 4 different digits
  const hasFourDifferentDigits = (value: string): boolean => {
    if (!value) return false;
    const digits = value.replace(/[^0-9]/g, ''); // Remove non-digit characters
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: ValidationErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      if (field !== 'notes') {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field as keyof ValidationErrors] = error;
        }
      }
    });

    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      setResult(null);

      const response = await fetch('https://main.d2k3jsz1ay4sj1.amplifyapp.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      setResult({
        prediction: data.prediction,
        probability: data.probability,
      });
    } catch (err) {
      setErrorMessage('Error analyzing data. Please try again.');
    } finally {
      setLoading(false);
    }


  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user types
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof ValidationErrors];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: keyof FormData) => {
    if (field !== 'notes' && formData[field]) {
      const error = validateField(field, formData[field]);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }
  };

  const getFieldLabel = (field: string) => {
    if (field === 't0') return 'T₀ (BJD)';
    if (field === 'period') return 'Period (days)';
    return field.charAt(0).toUpperCase() + field.slice(1);
  };

const getFieldPlaceholder = (field: string) => {
  if (field === 't0') return '67';
  if (field === 'period') return '123';
  if (field === 'time') return '67, 6767, 676767, 123';
  if (field === 'flux') return '76, 7666, 76667, 67';
  return '';
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
                {['time', 'flux', 'period', 't0'].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field} className="text-purple-200">
                      {getFieldLabel(field)}
                    </Label>
                    <Input
                      id={field}
                      type="text"
                      value={formData[field as keyof FormData]}
                      onChange={(e) => handleChange(field as keyof FormData, e.target.value)}
                      onBlur={() => handleBlur(field as keyof FormData)}
                      placeholder={getFieldPlaceholder(field)}
                      className={`bg-white/5 border-white/10 text-white placeholder:text-purple-500/40 focus:border-purple-500/50 ${
                        errors[field as keyof ValidationErrors] ? 'border-red-500/50' : ''
                      }`}
                      required
                    />
                    {errors[field as keyof ValidationErrors] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field as keyof ValidationErrors]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Notes */}
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