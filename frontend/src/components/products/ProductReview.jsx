import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StarRating = ({ value, onChange, readOnly = false }) => (
  <span>
    {[1,2,3,4,5].map(i => (
      <span
        key={i}
        style={{ color: i <= value ? '#fbbf24' : '#d1d5db', cursor: readOnly ? 'default' : 'pointer', fontSize: 20 }}
        onClick={() => !readOnly && onChange(i)}
      >★</span>
    ))}
  </span>
);

const ProductReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reviews/product/${productId}`);
      setReviews(data);
    } catch (err) {
      setError('Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, [productId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/reviews`,
        { productId, rating, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating(0); setContent('');
      fetchReviews();
    } catch (err) {
      setSubmitError(err?.response?.data || 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Product Reviews</h3>
      {loading ? <div>Loading...</div> : error ? <div className="text-red-500">{error}</div> : (
        <div className="space-y-4 mb-6">
          {reviews.length === 0 ? <div>No reviews yet.</div> : reviews.map(r => (
            <div key={r.id} className="border-b pb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{r.username}</span>
                <StarRating value={r.rating} readOnly />
                <span className="text-gray-400 text-xs">{r.createdAt?.slice(0, 19).replace('T', ' ')}</span>
              </div>
              <div className="text-gray-700">{r.content}</div>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-gray-50">
        <div className="mb-2 font-semibold">Your Review</div>
        <StarRating value={rating} onChange={setRating} />
        <textarea
          className="w-full border rounded px-2 py-1 mt-2 mb-2"
          rows={3}
          placeholder="Write your review..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        {submitError && <div className="text-red-500 mb-2">{submitError}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          disabled={submitting || rating === 0 || !content.trim()}
        >{submitting ? 'Submitting...' : 'Submit Review'}</button>
      </form>
    </div>
  );
};

export default ProductReview; 