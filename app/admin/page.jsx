"use client";

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' or 'works'
  
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  
  const [works, setWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(true);

  const [newWork, setNewWork] = useState({
    title: '',
    category: 'explainers',
    url: ''
  });
  const [isSubmittingWork, setIsSubmittingWork] = useState(false);

  const ADMIN_PASSWORD = "123"; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const leadsQ = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribeLeads = onSnapshot(leadsQ, (querySnapshot) => {
      const leadsData = [];
      querySnapshot.forEach((doc) => {
        leadsData.push({ id: doc.id, ...doc.data() });
      });
      setLeads(leadsData);
      setLoadingLeads(false);
    });

    const worksQ = query(collection(db, 'works'), orderBy('createdAt', 'desc'));
    const unsubscribeWorks = onSnapshot(worksQ, (querySnapshot) => {
      const worksData = [];
      querySnapshot.forEach((doc) => {
        worksData.push({ id: doc.id, ...doc.data() });
      });
      setWorks(worksData);
      setLoadingWorks(false);
    });

    return () => {
      unsubscribeLeads();
      unsubscribeWorks();
    };
  }, [isAuthenticated]);

  const handleDeleteLead = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      await deleteDoc(doc(db, 'leads', id));
    }
  };
  
  const handleDeleteWork = async (id) => {
    if (window.confirm("Are you sure you want to delete this portfolio video?")) {
      await deleteDoc(doc(db, 'works', id));
    }
  };

  const handleAddWork = async (e) => {
    e.preventDefault();
    if(!newWork.title || !newWork.url) return alert("Please fill all fields");
    
    setIsSubmittingWork(true);
    try {
      await addDoc(collection(db, 'works'), {
        ...newWork,
        createdAt: serverTimestamp()
      });
      setNewWork({ title: '', category: 'explainers', url: '' });
    } catch(err) {
      console.error(err);
      alert("Error adding work");
    }
    setIsSubmittingWork(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box glass">
          <h2>Admin Dashboard</h2>
          <p>Please enter the master password to view leads.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="admin-input"
            />
            <button type="submit" className="cta-button primary-cta">Login</button>
          </form>
          <Link href="/" className="back-link">← Back to Site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Dashboard</h1>
        <div className="admin-actions">
          <button onClick={() => setIsAuthenticated(false)} className="cta-button secondary-cta">Logout</button>
        </div>
      </div>
      
      <div className="admin-tabs" style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <button 
          className={`cta-button ${activeTab === 'leads' ? 'primary-cta' : 'secondary-cta'}`}
          onClick={() => setActiveTab('leads')}
        >
          Project Leads ({leads.length})
        </button>
        <button 
          className={`cta-button ${activeTab === 'works' ? 'primary-cta' : 'secondary-cta'}`}
          onClick={() => setActiveTab('works')}
        >
          Manage Portfolio ({works.length})
        </button>
      </div>

      {activeTab === 'leads' && (
        <div className="table-container glass">
          {loadingLeads ? (
            <div className="loading-state">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="empty-state">No project leads found yet.</div>
          ) : (
            <table className="excel-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>WhatsApp</th>
                  <th>Website</th>
                  <th>Budget</th>
                  <th>Start Date</th>
                  <th>Turnaround</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="whitespace-nowrap">
                      {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </td>
                    <td className="font-medium">{lead.name}</td>
                    <td><a href={`mailto:${lead.email}`}>{lead.email}</a></td>
                    <td><a href={`https://wa.me/${lead.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer">{lead.whatsapp}</a></td>
                    <td><a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noreferrer">{lead.website}</a></td>
                    <td><span className="badge">{lead.budget}</span></td>
                    <td>{lead.startDate}</td>
                    <td>{lead.turnaroundTime}</td>
                    <td className="desc-cell"><div className="scrollable-desc">{lead.description}</div></td>
                    <td>
                      <button onClick={() => handleDeleteLead(lead.id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'works' && (
        <div className="works-management-container" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          
          <div className="add-work-form glass" style={{ padding: '30px', borderRadius: '24px', flex: '1', minWidth: '300px', height: 'fit-content' }}>
            <h2>Add New Video</h2>
            <form onSubmit={handleAddWork} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Video Title</label>
                <input 
                  type="text" 
                  value={newWork.title} 
                  onChange={(e) => setNewWork({...newWork, title: e.target.value})} 
                  placeholder="e.g. Acme Corp Explainer"
                  className="admin-input"
                  style={{ margin: 0 }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Category</label>
                <select 
                  value={newWork.category}
                  onChange={(e) => setNewWork({...newWork, category: e.target.value})}
                  className="admin-input"
                  style={{ margin: 0 }}
                >
                  <option value="explainers">Product Explainer</option>
                  <option value="keynotes">Product Keynote</option>
                  <option value="ads">AD Creative</option>
                  <option value="vertical">Vertical Video</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Video URL (MP4 or YouTube)</label>
                <input 
                  type="text" 
                  value={newWork.url} 
                  onChange={(e) => setNewWork({...newWork, url: e.target.value})} 
                  placeholder="https://..."
                  className="admin-input"
                  style={{ margin: 0 }}
                  required
                />
              </div>

              <button type="submit" className="cta-button primary-cta" disabled={isSubmittingWork} style={{ marginTop: '10px' }}>
                {isSubmittingWork ? 'Adding...' : 'Add to Portfolio'}
              </button>
            </form>
          </div>

          <div className="works-list" style={{ flex: '2', minWidth: '400px' }}>
            <h2>Current Portfolio</h2>
            <div className="table-container glass" style={{ marginTop: '20px' }}>
              {loadingWorks ? (
                <div className="loading-state">Loading portfolio...</div>
              ) : works.length === 0 ? (
                <div className="empty-state">No portfolio videos added yet.</div>
              ) : (
                <table className="excel-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>URL</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {works.map((work) => (
                      <tr key={work.id}>
                        <td className="font-medium">{work.title}</td>
                        <td><span className="badge">{work.category}</span></td>
                        <td>
                          <a href={work.url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {work.url}
                          </a>
                        </td>
                        <td>
                          <button onClick={() => handleDeleteWork(work.id)} className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          
        </div>
      )}

    </div>
  );
}
