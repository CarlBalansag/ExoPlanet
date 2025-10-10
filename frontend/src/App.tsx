import { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ExoplanetData } from './components/ExoplanetData';
import { ResultsDisplay } from './components/ResultsDisplay';
import { StarBackground } from './components/StarBackground';
import DataInputForm, { FormData } from './components/DataInputForm';

export default function App() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [modelResult, setModelResult] = useState<{ prediction: string; probability: number } | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);


  const handleFormSubmit = (data: FormData, result?: { prediction: string; probability: number } | null) => {
    setSubmittedData(data);
    if (typeof result !== 'undefined') setModelResult(result ?? null);
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Exoplanet Data Section */}
      <ExoplanetData />

      {/* Data Input Form Section */}
      <DataInputForm onSubmit={handleFormSubmit} />

      {/* Results Section */}
      {submittedData && (
        <div id="results-section">
          <ResultsDisplay formData={submittedData} modelResult={modelResult} />
        </div>
      )}

      {/* Footer */}
      <footer className="relative py-16 text-center border-t border-purple-500/20 bg-black">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div
            className="inline-block rounded-2xl px-8 py-6"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.05))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(168, 85, 247, 0.15)',
            }}
          >
            <p className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-2 text-lg">
              2025 NASA Space Apps Challenge
            </p>
            <p className="text-sm text-purple-300/70">
              A World Away: Hunting for Exoplanets with AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
