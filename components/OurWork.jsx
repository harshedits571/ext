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
      const isPlaying = ytPlayingStates.current[v.id] || false;
      if (isPlaying) {
        iframeRefs.current[v.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
        ytPlayingStates.current[v.id] = false;
      } else {
        iframeRefs.current[v.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
        iframeRefs.current[v.id].contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
        ytPlayingStates.current[v.id] = true;
      }
    } else if (!isYt && videoRefs.current[v.id]) {
      const vid = videoRefs.current[v.id];
      if (vid.paused) {
        vid.muted = false;
        vid.play().catch(e => console.warn(e));
      } else {
        vid.pause();
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
        </div>
      </div>
      
      <div className="work-swiper-container" onTouchStart={handleUserInteraction} onMouseDown={handleUserInteraction}>
        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Loading portfolio...</p>
        ) : works.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No works added yet. Add some in the Admin panel.</p>
        ) : (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 300,
              modifier: 1,
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
