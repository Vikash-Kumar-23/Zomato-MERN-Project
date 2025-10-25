import React, { useEffect, useState } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa'

const Profile = () => {
  const { id } = useParams();
  const partnerId = id || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : undefined);
  const [foodPartner, setFoodPartner] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('meals');
  const [comments, setComments] = useState([
    { id: 1, name: 'Jane Doe', text: 'Absolutely amazing food! The pizza was cooked to perfection.', rating: 5 },
    { id: 2, name: 'John Smith', text: 'Great service and tasty meals. The ice cream was a bit melted though.', rating: 4 },
    { id: 3, name: 'Alice', text: 'Best food partner in the city. Highly recommend!', rating: 5 },
    { id: 4, name: 'Bob', text: 'Good food, but delivery was slow.', rating: 3 },
    { id: 5, name: 'Charlie', text: 'Loved the pasta, will order again!', rating: 5 },
  ]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    console.log('Profile ID from useParams:', id);
    console.log('Resolved partnerId:', partnerId);

    if (!partnerId) {
      setError('Invalid profile URL: missing partner id');
      return;
    }

    const fetchFoodPartnerData = async () => {
      try {
        const foodPartnerResponse = await axios.get(`http://localhost:3000/api/food-partner/${partnerId}`);
        // Backend may return either the document itself or { foodPartner }
        const fp = foodPartnerResponse.data?.foodPartner ?? foodPartnerResponse.data;
        setFoodPartner(fp);

        const foodItemsResponse = await axios.get(`http://localhost:3000/api/food-partner/${partnerId}/fooditems`);
        setFoodItems(foodItemsResponse.data.foodItems || []);
        setError('');
      } catch (error) {
        console.error('Error fetching food partner data:', error?.message || error);
        setError(error?.message || 'Failed to load profile');
      }
    };

    fetchFoodPartnerData();
  }, [id, partnerId]);

  if (error && !foodPartner) {
    return <div style={{ padding: 16 }}>Error: {error}</div>;
  }

  if (!foodPartner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar"></div>
        <div className="profile-info">
          <h2 className="business-name">{foodPartner.name}</h2>
          <p className="address">
            <FaMapMarkerAlt />
            <span>{foodPartner.address}</span>
          </p>
          <p className="contact-name">
            <FaUser />
            <span className="contact-label">Contact:</span>
            <span className="contact-value">{foodPartner.contactName}</span>
          </p>
          <p className="phone">
            <FaPhone />
            <span className="phone-label">Phone:</span>
            <span className="phone-value">{foodPartner.phone}</span>
          </p>
          <p className="email">
            <FaEnvelope />
            <span className="email-label">Email:</span>
            <span className="email-value">{foodPartner.email}</span>
          </p>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={activeTab === "meals" ? "active" : ""}
          onClick={() => setActiveTab("meals")}
        >
          Total Meals
        </button>
        <button
          className={activeTab === "service" ? "active" : ""}
          onClick={() => setActiveTab("service")}
        >
          Customer Service
        </button>
      </div>

      {activeTab === 'meals' && (
        <div className="video-grid">
          {foodItems.map((item) => (
            <div className="video-placeholder" key={item._id}>
              <video src={item.video} controls />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'service' && (
        <div className="comments-section">
          <button className="write-review-btn">Write a Review</button>
          <div className="customer-reviews">
            <h3>Customer Reviews</h3>
            {comments.slice(0, showAll ? comments.length : 3).map((review) => (
              <div className="review-card" key={review.id}>
                <div className="reviewer-name">{review.name}</div>
                <div className="review-text">{review.text}</div>
                <div className="review-rating">{'★'.repeat(review.rating)}</div>
              </div>
            ))}
            {comments.length > 3 && !showAll && (
              <button className="see-more-btn" onClick={() => setShowAll(true)}>See More ({comments.length - 3} more)</button>
            )}
          </div>
          <div className="customer-service-footer">
            <h4>Contact Customer Support</h4>
            <p>
              <FaEnvelope /> Email: {foodPartner.customerServiceEmail}
            </p>
            <p>
              <FaPhone /> Phone: {foodPartner.customerServicePhone}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
