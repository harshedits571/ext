"use client";

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function StartProject() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    website: '',
    description: '',
    budget: '',
    startDate: '',
    turnaroundTime: ''
  });

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
    } catch (error) {
      console.error("Error submitting form: ", error);
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="form-page-container">
      <Navbar />
      
      <section className="form-section">
        <div className="form-wrapper glass">
          {status === 'success' ? (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h2>Thank you for your interest!</h2>
              <p>We've received your project details and will get back to you shortly.</p>
              <Link href="/" className="cta-button primary-cta">Return to Home</Link>
            </div>
          ) : (
            <>
              <h1 className="form-title">Start your project now!</h1>
              <p className="form-subtitle">Thank you for choosing our Motion Studio!</p>
              <p className="form-desc">Fill out our form with your project details, and we will get back to you shortly.</p>
              
              <form onSubmit={handleSubmit} className="custom-form">
                <div className="form-group">
                  <label htmlFor="name">Name? *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="What do you like to be called?" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email? *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Your preferred email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="whatsapp">WhatsApp Number? *</label>
                  <p className="field-hint">(begin with country code, example : +165...)</p>
                  <input 
                    type="tel" 
                    id="whatsapp" 
                    name="whatsapp" 
                    placeholder="Your WhatsApp number" 
                    required 
                    value={formData.whatsapp}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="website">Company website? *</label>
                  <p className="field-hint">(example : chatgpt.com)</p>
                  <input 
                    type="url" 
                    id="website" 
                    name="website" 
                    placeholder="Enter your @company website" 
                    required 
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Write a brief description about your project *</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    placeholder="Feel free to share the video content, style, reference, or any helpful links" 
                    required 
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="budget">What's your budget for this project? *</label>
                  <select 
                    id="budget" 
                    name="budget" 
                    required 
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select a range</option>
                    <option value="Under $5k">Under $5k</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k - $25k">$10k - $25k</option>
                    <option value="$25k+">$25k+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="startDate">When would you like to start your project? *</label>
                  <input 
                    type="text" 
                    id="startDate" 
                    name="startDate" 
                    placeholder="e.g. Immediately, Next month..." 
                    required 
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="turnaroundTime">Expected turnaround time for the video *</label>
                  <input 
                    type="text" 
                    id="turnaroundTime" 
                    name="turnaroundTime" 
                    placeholder="Type in days, hours and minutes" 
                    required 
                    value={formData.turnaroundTime}
                    onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <div className="error-message">
                    An error occurred: {errorMessage}
                  </div>
                )}

                <button type="submit" className="cta-button primary-cta submit-btn" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Submitting...' : 'Let\'s Go! →'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
