import React, { useEffect, useState } from 'react'
import './profile.css'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa'

const Profile = () => {
  const { id } = useParams();
  const partnerId = id || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : undefined);
  const navigate = useNavigate();
  const [foodPartner, setFoodPartner] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('meals');
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

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
        // Prefer food items and reviews if included in profile response
        if (foodPartnerResponse.data?.foodItems) {
          setFoodItems(foodPartnerResponse.data.foodItems);
        } else {
          const foodItemsResponse = await axios.get(`http://localhost:3000/api/food-partner/${partnerId}/fooditems`);
          setFoodItems(foodItemsResponse.data.foodItems || []);
        }
        if (foodPartnerResponse.data?.reviews) {
          setReviews(foodPartnerResponse.data.reviews);
        } else {
          const reviewsResponse = await axios.get(`http://localhost:3000/api/food-partner/${partnerId}/reviews`);
          setReviews(reviewsResponse.data.reviews || []);
        }
        setError('');
      } catch (error) {
        console.error('Error fetching food partner data:', error?.message || error);
        setError(error?.message || 'Failed to load profile');
      }
    };

    fetchFoodPartnerData();
  }, [id, partnerId]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError('Please add a comment');
      return;
    }
    if (newRating < 1 || newRating > 5) {
      setError('Rating must be between 1 and 5');
      return;
    }
    try {
      setSubmitting(true);
      await axios.post(
        `http://localhost:3000/api/food-partner/${partnerId}/reviews`,
        { rating: newRating, comment: newComment },
        { withCredentials: true }
      );
      // Refresh reviews to include the new one with populated user name
      const reviewsResponse = await axios.get(`http://localhost:3000/api/food-partner/${partnerId}/reviews`);
      setReviews(reviewsResponse.data.reviews || []);
      setNewComment('');
      setNewRating(5);
      setShowReviewForm(false);
      setError('');
    } catch (err) {
      console.error('Error submitting review:', err?.response?.data || err?.message || err);
      const msg = err?.response?.data?.message || err?.message || 'Failed to submit review';
      setError(msg);
      if (err?.response?.status === 401) {
        setUnauthorized(true);
      } else {
        setUnauthorized(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

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
          <button className="write-review-btn" onClick={() => setShowReviewForm((v) => !v)}>
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
          {showReviewForm && (
            <form className="review-form" onSubmit={submitReview} style={{ marginTop: 12 }}>
              <label style={{ display: 'block', marginBottom: 8 }}>
                Rating:
                <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))} style={{ marginLeft: 8 }}>
                  {[1,2,3,4,5].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </label>
              <textarea
                placeholder="Share your experience..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                style={{ width: '100%', marginBottom: 8 }}
              />
              <button type="submit" className="submit-review-btn" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              {error && (
                <div style={{ color: 'salmon', marginTop: 8 }}>{error}</div>
              )}
              {unauthorized && (
                <button
                  type="button"
                  className="login-btn"
                  onClick={() => navigate('/user/login')}
                  style={{ marginTop: 8, background: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: 6 }}
                >
                  Login to write a review
                </button>
              )}
            </form>
          )}
          <div className="customer-reviews">
            <h3>Customer Reviews</h3>
            {reviews.slice(0, showAll ? reviews.length : 3).map((review) => (
              <div className="review-card" key={review._id}>
                <div className="reviewer-name">{review?.user?.fullName || 'Anonymous'}</div>
                <div className="review-text">{review.comment}</div>
                <div className="review-rating">{'★'.repeat(review.rating)}</div>
              </div>
            ))}
            {reviews.length > 3 && !showAll && (
              <button className="see-more-btn" onClick={() => setShowAll(true)}>See More ({reviews.length - 3} more)</button>
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
