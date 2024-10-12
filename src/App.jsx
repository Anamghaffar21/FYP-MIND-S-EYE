import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './UserContext';
import Navbar from './Components/navbar/navbar';
import Hero from './Components/hero/hero';
import Features from './Components/features/features';
import HowItWorks from './Components/howitworks/howitworks';
import Footer from './Components/footer/footer';
import Background from './Components/background/background';
import LoginForm from './Components/login/login';
import SignupForm from './Components/signup/signup';
import FAQ from './Components/FAQ/FAQ';
import Community from './Components/Community/Community';
import UseCases from './Components/usecase/usecase';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './Components/TermsOfService/TermsOfService';
import ContactUs from './Components/ContactUs/ContactUs';
import Profile from './Components/Profile/Profile';
import QuestionInput from './Components/QuestionInput/QuestionInput'; 

import './App.css';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Profile error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong in the Profile component.</h1>;
    }
    return this.props.children;
  }
}

function AppContent() {
  const { user } = useUser();
  console.log('AppContent rendered, user:', user);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Features />
            <HowItWorks />
          </>
        } />
        <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/profile" />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/community" element={<Community />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/ask-question" element={user ? <QuestionInput /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
      <Footer />
      <Background />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent /> 
      </Router>
    </UserProvider>
  );
}

export default App;
