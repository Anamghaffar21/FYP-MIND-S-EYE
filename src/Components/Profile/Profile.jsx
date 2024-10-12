import React, { useState } from 'react';
import { useUser } from '../../UserContext';
import { uploadImage, submitQuestion } from '../../api'; // Make sure these functions are defined in your api.js
import QuestionInput from '../QuestionInput/QuestionInput'; // Ensure this path is correct
import './Profile.css';

function Profile() {
  const { user } = useUser();
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [questionStatus, setQuestionStatus] = useState('');

  console.log('Profile component rendered, user:', user);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      setUploadStatus('Please select an image first.');
      return;
    }

    try {
      const result = await uploadImage(image);
      console.log('Image uploaded successfully:', result);
      setUploadStatus('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Failed to upload image. Please try again.');
    }
  };

  const handleQuestionSubmit = async (question) => {
    try {
      const response = await submitQuestion(question);
      console.log('Question submitted:', response);
      setQuestionStatus('Question submitted successfully!');
    } catch (error) {
      console.error('Error submitting question:', error);
      setQuestionStatus('Failed to submit question. Please try again.');
    }
  };

  return (
    <div style={{padding: '20px', background: 'white', color: 'black'}}>
      <h1>Profile Page</h1>
      <p>Welcome, {user?.name || 'User'}!</p>
      <p>Email: {user?.email}</p>
      
      <div className="profile-image-section">
        <h2>Upload Profile Picture</h2>
        <form onSubmit={handleImageUpload}>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            accept="image/*"
          />
          <button type="submit">Upload Image</button>
        </form>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
      
      <div className="question-input-section">
        <h2>Ask a Question</h2>
        <QuestionInput onSubmit={handleQuestionSubmit} />
        {questionStatus && <p>{questionStatus}</p>}
      </div>
    </div>
  );
}

export default Profile;
