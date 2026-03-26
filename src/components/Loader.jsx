import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';
import './Loader.css';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate AI thinking process with dynamic progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const jump = Math.random() * 15;
        if (prev + jump >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + jump;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel text-center animate-fade-in" style={{ padding: '3rem 2rem' }}>
      <div className="loader-animation-container">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
        <div className="brain-icon-wrapper">
          <BrainCircuit size={48} className="brain-icon" />
        </div>
      </div>
      
      <h3 className="loader-title">
        <Sparkles size={20} className="sparkle-icon" />
        Analizando con IA...
      </h3>
      <p className="loader-desc">Comparando patrones y evaluando morfología...</p>
      
      <div className="progress-bar-container mt-8">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">{Math.floor(progress)}% completado</div>
    </div>
  );
}
