import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import './ImageUploader.css';

export default function ImageUploader({ onImageSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      // Give UI a tiny moment to show preview before sending up
      setTimeout(() => onImageSelect(file, reader.result), 600);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem' }}>
      <div 
        className={`uploader-zone ${isDragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handleChange} 
        />
        
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Selected lesion" className="image-preview" />
            <div className="preview-overlay">
              <ImageIcon className="overlay-icon" />
              <span>Procesando imagen...</span>
            </div>
          </div>
        ) : (
          <div className="uploader-content">
            <div className="icon-circle">
              <UploadCloud size={40} className="upload-icon" />
            </div>
            <h3 className="uploader-title">Sube o arrastra la imagen</h3>
            <p className="uploader-desc">Archivos soportados: JPG, PNG, WEBP (hasta 10MB)</p>
            <button className="btn btn-primary mt-4">Explorar archivos</button>
          </div>
        )}
      </div>
    </div>
  );
}
