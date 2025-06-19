import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaBoxOpen, FaList } from 'react-icons/fa';

const SellerStore = () => {
  const [store, setStore] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStore = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/store/my-store`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStore(data);
        setForm({ name: data.name, description: data.description });
      } catch (err) {
        setError('Failed to load store info.');
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setForm({ name: store.name, description: store.description });
  };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/store/${store.id}`,
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStore({ ...store, ...form });
      setEditMode(false);
    } catch (err) {
      setError('Failed to update store info.');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!store) return null;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">My Store</h2>
      <div className="mb-6">
        {editMode ? (
          <>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Store Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleSave}
              >Save</button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center mb-2">
              <span className="text-xl font-semibold mr-2">{store.name}</span>
              <button
                className="ml-2 text-blue-600 hover:text-blue-800"
                onClick={handleEdit}
                title="Edit Store Info"
              >
                <FaEdit />
              </button>
            </div>
            <div className="text-gray-700 mb-2">{store.description}</div>
          </>
        )}
      </div>
      <div className="flex gap-6 mt-8">
        <button
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate('/seller/products')}
        >
          <FaList />
          Manage Products
        </button>
        <button
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => navigate('/seller/orders')}
        >
          <FaBoxOpen />
          Manage Orders
        </button>
      </div>
    </div>
  );
};

export default SellerStore; 