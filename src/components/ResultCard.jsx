import React from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import './ResultCard.css';

export default function ResultCard({ result, image, onReset }) {
  // result = { type: 'Melanoma', confidence: 0.92, riskLevel: 'high' }

  const getRiskDetails = (level) => {
    switch (level) {
      case 'high':
        return { icon: <AlertTriangle size={32} />, color: 'var(--color-danger)', text: 'Alto Riesgo', class: 'danger' };
      case 'medium':
        return { icon: <ShieldAlert size={32} />, color: 'var(--color-warn)', text: 'Riesgo Moderado', class: 'warn' };
      case 'low':
      default:
        return { icon: <CheckCircle size={32} />, color: 'var(--color-success)', text: 'Bajo Riesgo', class: 'success' };
    }
  };

  const risk = (result && result.riskLevel) ? getRiskDetails(result.riskLevel) : getRiskDetails('low');

  return (
    <div className="glass-panel animate-fade-in result-card">
      <div className="result-header">
        <h2 className="title" style={{ fontSize: '2rem', marginBottom: 0 }}>Resultados del Análisis</h2>
      </div>

      <div className="result-content">
        <div className="result-image-box">
          <img src={image} alt="Lesión analizada" className="result-image" />
        </div>
        
        <div className="result-details">
          <div className={`risk-badge ${risk.class}`}>
            {risk.icon}
            <span className="risk-text">{risk.text}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Tipo detectado:</span>
            <span className="detail-value highlight">{result?.type || 'No identificado'}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Confianza IA:</span>
            <div className="confidence-wrapper">
              <span className="detail-value">{result ? Math.round(result.confidence * 100) : 0}%</span>
              <div className="confidence-track">
                <div 
                  className="confidence-fill" 
                  style={{ 
                    width: `${result ? Math.round(result.confidence * 100) : 0}%`,
                    backgroundColor: risk.color 
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="disclaimer-box">
            <p className="disclaimer-text">
              <strong>Aviso Médico:</strong> Este análisis es generado por inteligencia artificial y tiene fines únicamente informativos. 
              <strong> NO SUSTITUYE</strong> un diagnóstico médico profesional. Si notas cambios en tu piel, acude a un dermatólogo.
            </p>
          </div>
          
          <button className="btn btn-outline reset-btn mt-4" onClick={onReset}>
            <RefreshCw size={18} />
            Analizar nueva imagen
          </button>
        </div>
      </div>
    </div>
  );
}
