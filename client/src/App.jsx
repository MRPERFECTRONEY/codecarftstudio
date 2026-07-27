import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TechStackExplorer from './components/TechStackExplorer';
import AboutUsPage from './components/AboutUsPage';
import ContactUsPage from './components/ContactUsPage';
import ClientTracker from './components/ClientTracker';
import InquiryForm from './components/InquiryForm';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { Search, Sparkles } from 'lucide-react';
import { detectDefaultCurrency, formatPrice } from './services/currency';

export default function App() {
  const [activeTab, setActiveTab] = useState('main'); // 'main' | 'about' | 'contact' | 'tracker'
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currency, setCurrency] = useState(() => detectDefaultCurrency()); // Defaults to 'INR' for India
  const [estimatorSelection, setEstimatorSelection] = useState(null);
  const [trackerCode, setTrackerCode] = useState('');

  const handleSelectService = (serviceTitle) => {
    const baseUsdRange = serviceTitle.includes('Mobile') ? 6500 : serviceTitle.includes('AI') ? 7500 : 5000;
    setEstimatorSelection({
      project_type: serviceTitle,
      estimated_budget: formatPrice(baseUsdRange, currency),
      estimated_timeline: '4-6 Weeks',
      selected_features: ['Custom Architecture', 'Database & REST API']
    });
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTracker = (code) => {
    setTrackerCode(code);
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-main)' }}>
      {/* Header Bar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* View Switcher */}
      {isAdminMode ? (
        <AdminDashboard currency={currency} />
      ) : activeTab === 'about' ? (
        /* Standalone About Us Page */
        <AboutUsPage 
          onNavigateContact={() => {
            setActiveTab('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : activeTab === 'contact' ? (
        /* Standalone Contact Us Page */
        <ContactUsPage 
          currency={currency}
        />
      ) : activeTab === 'tracker' ? (
        /* Client Project Tracking View */
        <ClientTracker defaultCode={trackerCode} currency={currency} />
      ) : (
        /* Main Public Agency Landing Page */
        <main>
          <HeroSection 
            currency={currency}
            onOpenInquiry={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <ServicesSection 
            onSelectService={handleSelectService}
          />

          <TechStackExplorer 
            onSelectTech={(techName) => {
              setEstimatorSelection({
                project_type: 'Custom ' + techName + ' Application',
                estimated_budget: formatPrice(6000, currency),
                estimated_timeline: '4-6 Weeks',
                selected_features: [techName + ' Module']
              });
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <InquiryForm 
            currency={currency}
            initialData={estimatorSelection}
            onNavigateTracker={handleNavigateTracker}
          />
        </main>
      )}

      {/* Floating Quick Action Launcher */}
      <div className="floating-widget">
        <button 
          className="floating-btn"
          onClick={() => {
            setActiveTab('tracker');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Track your project delivery"
        >
          <Search size={18} color="var(--cyan-glow)" />
          <span>Client Tracker</span>
        </button>

        <button 
          className="floating-btn"
          style={{ background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)', color: '#07090e' }}
          onClick={() => {
            setActiveTab('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Request a Project Quote"
        >
          <Sparkles size={18} />
          <span>Contact Us</span>
        </button>
      </div>

      {/* Global Footer */}
      <Footer 
        onNavigate={(target) => {
          if (target === 'tracker') {
            setActiveTab('tracker');
          } else if (target === 'about') {
            setActiveTab('about');
          } else if (target === 'contact' || target === 'inquiry') {
            setActiveTab('contact');
          } else {
            setActiveTab('main');
            setTimeout(() => {
              document.getElementById(`${target}-section`)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
