import React from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onUpload }) => {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="image-upload">
      <button onClick={() => document.getElementById('image-upload').click()}>
        Upload Image
      </button>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUpload;