"use client";

import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function OurWork({ onOpenModal }) {
  const [filter, setFilter] = useState('all');
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);
  
  const videoRefs = useRef({});
  const iframeRefs = useRef({});
  const userInteractedRef = useRef(false);
  const sectionRef = useRef(null);

  const handleUserInteraction = () => {
    userInteractedRef.current = true;
  };

  useEffect(() => {
    const q = query(collection(db, 'works'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const worksData = [];
      snapshot.forEach(doc => {
        worksData.push({ id: doc.id, ...doc.data() });
      });
      setWorks(worksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.2 } // Requires at least 20% of section to be visible
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const isYouTube = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  const filteredWorks = works.filter(v => filter === 'all' || v.category === filter);

  useEffect(() => {
    // CRITICAL FIX: Ensure no ghost videos appear as 'playing' when we slide the carousel
    document.querySelectorAll('.stacked-card').forEach(el => el.classList.remove('playing'));

    filteredWorks.forEach((w, index) => {
      const isYt = isYouTube(w.url);
      if (index === activeIndex && isInView) {
        if (isYt && iframeRefs.current[w.id]) {
          if (userInteractedRef.current) {
             iframeRefs.current[w.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
          }
          iframeRefs.current[w.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
        } else if (!isYt && videoRefs.current[w.id]) {
          videoRefs.current[w.id].muted = !userInteractedRef.current;
          videoRefs.current[w.id].play().catch(e => console.warn(e));
        }
      } else {
        if (isYt && iframeRefs.current[w.id]) {
          iframeRefs.current[w.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
          ytPlayingStates.current[w.id] = false; // Keep tracking state in sync
          if (index !== activeIndex) {
            iframeRefs.current[w.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }), '*');
          }
        } else if (!isYt && videoRefs.current[w.id]) {
          videoRefs.current[w.id].pause();
          if (index !== activeIndex) {
            videoRefs.current[w.id].currentTime = 0;
          }
        }
      }
    });
  }, [activeIndex, filteredWorks, isInView]);

  const getYouTubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytPlayingStates = useRef({}); // simple state tracker for iframes

  const handleCardClick = (e, v, index) => {
    e.stopPropagation(); // prevent bubbled events that might re-trigger
    handleUserInteraction();
    
    if (index !== activeIndex) return; // Swiper automatically slides to non-active cards on click

    const isYt = isYouTube(v.url);
    if (isYt && iframeRefs.current[v.id]) {
      if (ytPlayingStates.current[v.id]) {
        iframeRefs.current[v.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
        ytPlayingStates.current[v.id] = false;
        e.currentTarget.classList.remove('playing');
      } else {
        iframeRefs.current[v.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
        iframeRefs.current[v.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
        ytPlayingStates.current[v.id] = true;
        e.currentTarget.classList.add('playing');
      }
    } else if (!isYt && videoRefs.current[v.id]) {
      const vid = videoRefs.current[v.id];
      if (vid.paused) {
        vid.muted = false;
        vid.play().then(() => {
          e.currentTarget.classList.add('playing');
        }).catch(err => console.error("Autoplay prevented:", err));
      } else {
        vid.pause();
        e.currentTarget.classList.remove('playing');
      }
    }
  };

  return (
    <motion.section 
      id="work" 
      className="work-section" 
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
    >
      <div className="work-header">
        <h2 className="section-title" style={{ margin: 0 }}>Selected work</h2>
        <div className="work-filters">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => { setFilter('all'); setActiveIndex(0); handleUserInteraction(); }}>All</button>
          <button className={`filter-btn ${filter === 'explainers' ? 'active' : ''}`} onClick={() => { setFilter('explainers'); setActiveIndex(0); handleUserInteraction(); }}>Product Explainers</button>
          <button className={`filter-btn ${filter === 'keynotes' ? 'active' : ''}`} onClick={() => { setFilter('keynotes'); setActiveIndex(0); handleUserInteraction(); }}>Product Keynotes</button>
          <button className={`filter-btn ${filter === 'ads' ? 'active' : ''}`} onClick={() => { setFilter('ads'); setActiveIndex(0); handleUserInteraction(); }}>AD creatives</button>
          <button className={`filter-btn ${filter === 'vertical' ? 'active' : ''}`} onClick={() => { setFilter('vertical'); setActiveIndex(0); handleUserInteraction(); }}>Vertical Videos</button>
        </div>
      </div>
      
      <div className="work-swiper-container" onTouchStart={handleUserInteraction} onMouseDown={handleUserInteraction}>
        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Loading portfolio...</p>
        ) : works.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No works added yet. Add some in the Admin panel.</p>
        ) : filter === 'vertical' ? (
          <div className="p3d-slider-outer-wrapper">
            <div className="p3d-slider-container reveal" id="p3dContainer">
              <div className="p3d-nav">
                  <div className="p3d-btn" id="p3dPrev" onClick={(e) => { e.stopPropagation(); handleUserInteraction(); setActiveIndex((prev) => (prev - 1 + filteredWorks.length) % filteredWorks.length); }}>
                      <svg viewBox="0 0 24 24">
                          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
                      </svg>
                  </div>
                  <div className="p3d-btn" id="p3dNext" onClick={(e) => { e.stopPropagation(); handleUserInteraction(); setActiveIndex((prev) => (prev + 1) % filteredWorks.length); }}>
                      <svg viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                      </svg>
                  </div>
              </div>

              {filteredWorks.map((v, i) => {
                const totalStackCards = filteredWorks.length;
                let offset = i - activeIndex;
                if (offset > Math.floor(totalStackCards / 2)) offset -= totalStackCards;
                if (offset < -Math.floor(totalStackCards / 2)) offset += totalStackCards;

                let cardClass = 'stacked-card';
                if (offset === 0) cardClass += ' active';
                else if (offset === -1) cardClass += ' left-1';
                else if (offset === 1) cardClass += ' right-1';
                else if (offset === -2) cardClass += ' left-2';
                else if (offset === 2) cardClass += ' right-2';
                else if (offset < 0) cardClass += ' hidden-left';
                else cardClass += ' hidden-right';

                const isYt = isYouTube(v.url);

                return (
                  <div key={v.id} className={cardClass} onClick={(e) => handleCardClick(e, v, i)}>
                    {isYt ? (
                        <iframe 
                          ref={(el) => iframeRefs.current[v.id] = el}
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${getYouTubeId(v.url)}?enablejsapi=1&mute=1`} 
                          title={v.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          style={{ pointerEvents: offset === 0 ? 'auto' : 'none' }}
                        ></iframe>
                      ) : (
                        <video 
                          ref={(el) => videoRefs.current[v.id] = el}
                          src={v.url} 
                          controls={false} 
                          preload="metadata"
                          loop
                          playsInline
                        />
                      )}
                      <div className="p3d-play"></div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Swiper
            key={filter} /* Force full re-mount when filter changes to fix looping bugs */
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={filteredWorks.length > 2} /* Only loop if enough slides exist */
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            coverflowEffect={{
              rotate: 0,
              stretch: -80, // Pulls slides together to overlap
              depth: 250, // Pushes them back
              modifier: 1,
              scale: 0.85, // Scales down inactive slides
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {filteredWorks.map((v, index) => {
              const isYt = isYouTube(v.url);
              
              return (
                <SwiperSlide key={v.id}>
                  <div className="video-card" onClick={(e) => handleCardClick(e, v, index)}>
                    <div className="video-thumbnail" style={{ position: 'relative', width: '100%', height: '100%', background: '#000', pointerEvents: index === activeIndex ? 'auto' : 'none' }}>
                      
                      {isYt ? (
                        <iframe 
                          ref={(el) => iframeRefs.current[v.id] = el}
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${getYouTubeId(v.url)}?enablejsapi=1&mute=1`} 
                          title={v.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                        ></iframe>
                      ) : (
                        <video 
                          ref={(el) => videoRefs.current[v.id] = el}
                          src={v.url} 
                          controls={false} 
                          preload="metadata"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                        />
                      )}
                      
                      {/* Play Button Overlay for Active Slide */}
                      <div className="play-overlay" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        display: index === activeIndex ? 'flex' : 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        zIndex: 10,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                      }}>
                        <div style={{
                          width: 0,
                          height: 0,
                          borderTop: '10px solid transparent',
                          borderBottom: '10px solid transparent',
                          borderLeft: '16px solid #111',
                          marginLeft: '6px' /* Center the triangle visually */
                        }}></div>
                      </div>

                      <div className="category-tag" style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', pointerEvents: 'none', opacity: index === activeIndex ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                        {v.title}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </motion.section>
  );
}
