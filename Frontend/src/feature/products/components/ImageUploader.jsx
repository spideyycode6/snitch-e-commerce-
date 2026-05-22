import React, { useState, useRef } from 'react';
import { RiUploadCloud2Line, RiCloseLine, RiImageLine } from 'react-icons/ri';

const ImageUploader = ({ images, onChange, maxImages = 7 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newImages = [...images];
    let hasError = false;

    Array.from(files).forEach((file) => {
      if (newImages.length >= maxImages) {
        setError(`You can only upload up to ${maxImages} images`);
        hasError = true;
        return;
      }

      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError('Only JPEG, PNG, and WEBP formats are accepted');
        hasError = true;
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Max file size is 5MB per image');
        hasError = true;
        return;
      }

      newImages.push({
        file,
        preview: URL.createObjectURL(file),
      });
    });

    if (!hasError) setError('');
    onChange(newImages);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    onChange(newImages);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full">
      <div 
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 border-2 border-dashed rounded-2xl transition-all ${
          dragActive ? 'border-[#111111] bg-gray-50 ring-2 ring-[#111111]/10' : 'border-gray-200 bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {images.map((img, index) => (
          <div key={index} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100">
            <img 
              src={img.preview} 
              alt={`Upload ${index}`} 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-white/90 hover:bg-white text-[#111111] p-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <RiCloseLine className="w-4 h-4" />
            </button>
            {index === 0 && (
              <div className="absolute bottom-1 left-1 bg-[#111111] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tight">
                Cover
              </div>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={triggerFileInput}
            className="aspect-square flex flex-col items-center justify-center border border-gray-200 rounded-xl bg-[#F5F5F5] hover:bg-gray-100 transition-colors group"
          >
            <RiUploadCloud2Line className="w-6 h-6 text-gray-400 group-hover:text-[#111111] transition-colors" />
            <span className="text-[10px] text-gray-500 mt-1 font-['Inter',_sans-serif]">Add Image</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleChange}
        />
      </div>
      
      {error && (
        <p className="text-red-500 text-xs mt-2 font-['Inter',_sans-serif]">{error}</p>
      )}
      
      <p className="text-gray-400 text-[10px] mt-2 font-['Inter',_sans-serif]">
        Accepted formats: JPEG, PNG, WEBP. Max 5MB per image. Up to {maxImages} images.
      </p>
    </div>
  );
};

export default ImageUploader;
