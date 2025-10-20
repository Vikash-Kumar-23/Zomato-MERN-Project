import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './home.css';
import { useNavigate,Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const videosRef = useRef([]);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.5, 0.8] }
    );

    videosRef.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videosRef.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
      observer.disconnect();
    };
  }, [videos]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/food',{withCredentials:true})
      .then((response) => {
        setVideos(response.data.foodItems);
      })
      .catch((error) => {
        console.error('Error fetching food items:', error);
      });
  }, []);

  return (
    <div className="reels-container">
      {videos.map((item, idx) => (
        <section className="reel" key={item._id}>
          <video
            ref={(el) => (videosRef.current[idx] = el)}
            src={item.video}
            muted
            loop
            playsInline
            preload="metadata"
          />

          <div className="overlay-gradient" />
          <div className="overlay-content">
            <p className="reel-description line-clamp-2">{item.description}</p>
            <button
              className="visit-store-button"
              onClick={() => navigate(`/store/${item.foodPartner}`)}
            >
              Visit Store
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;