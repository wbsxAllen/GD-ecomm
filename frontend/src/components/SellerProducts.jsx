import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import Paginations from "./shared/Paginations";
import { useSearchParams } from "react-router-dom";

const SellerProducts = () => {
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', stock: '', scale: '', grade: '', series: '', imageUrl: '', isAvailable: true
  });
  const [editProduct, setEditProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 9,
    totalElements: 0,
    totalPages: 1,
    lastPage: true
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchStoreAndProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const { data: storeData } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/store/my-store`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStore(storeData);

      const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) - 1 : 0;
      const { data: productsData } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products?storeId=${storeData.id}&showAll=true&pageNumber=${currentPage}&pageSize=9`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(productsData.content || []);
      setPagination({
        pageNumber: productsData.pageNumber,
        pageSize: productsData.pageSize,
        totalElements: productsData.totalElements,
        totalPages: productsData.totalPages,
        lastPage: productsData.lastPage
      });
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreAndProducts();
  }, [searchParams]);

  const handleAdd = () => {
    setForm({ name: '', description: '', price: '', stock: '', scale: '', grade: '', series: '', imageUrl: '', isAvailable: true });
    setShowAdd(true);
  };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products`,
        { ...form, price: Number(form.price), stock: Number(form.stock), isAvailable: form.isAvailable },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowAdd(false);
      fetchStoreAndProducts();
    } catch (err) {
      setError('Failed to add product.');
    }
  };
  const handleUnlist = async (id) => {
    if (!window.confirm('Are you sure to unlist this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
        { isAvailable: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStoreAndProducts();
    } catch (err) {
      setError('Failed to unlist product.');
    }
  };
  const handleRelist = async (id) => {
    if (!window.confirm('Are you sure to relist this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
        { isAvailable: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStoreAndProducts();
    } catch (err) {
      setError('Failed to relist product.');
    }
  };
  const handleEdit = (product) => {
    setEditProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      scale: product.scale,
      grade: product.grade,
      series: product.series,
      imageUrl: product.imageUrl
    });
    setShowEdit(true);
  };
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });
  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/products/${editProduct.id}`,
        { ...editForm, price: Number(editForm.price), stock: Number(editForm.stock) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowEdit(false);
      setEditProduct(null);
      fetchStoreAndProducts();
    } catch (err) {
      setError('Failed to update product.');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Products</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700" onClick={handleAdd}>
          <FaPlus /> Add Product
        </button>
      </div>
      {showAdd && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input className="border rounded px-2 py-1" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <input className="border rounded px-2 py-1" name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} />
            <input className="border rounded px-2 py-1" name="stock" placeholder="Stock" type="number" value={form.stock} onChange={handleChange} />
            <input className="border rounded px-2 py-1" name="scale" placeholder="Scale (e.g. 1_144)" value={form.scale} onChange={handleChange} />
            <input className="border rounded px-2 py-1" name="grade" placeholder="Grade (e.g. HG)" value={form.grade} onChange={handleChange} />
            <input className="border rounded px-2 py-1" name="series" placeholder="Series (e.g. UC)" value={form.series} onChange={handleChange} />
            <input className="border rounded px-2 py-1 col-span-2" name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
          </div>
          <textarea className="border rounded px-2 py-1 w-full mb-2" name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={2} />
          <div className="flex gap-4 mb-2 items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} /> Available
            </label>
            <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" onClick={handleSubmit}>Save</button>
            <button className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Scale</th>
            <th className="p-2">Grade</th>
            <th className="p-2">Series</th>
            <th className="p-2">Available</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan={8} className="text-center py-6">No products found.</td></tr>
          ) : (
            products.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.name}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2">{p.stock}</td>
                <td className="p-2">{p.scale}</td>
                <td className="p-2">{p.grade}</td>
                <td className="p-2">{p.series}</td>
                <td className="p-2">{p.isAvailable ? 'Yes' : 'No'}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(p)} title="Edit">
                    <FaEdit /> Edit
                  </button>
                  {p.isAvailable ? (
                    <button className="text-yellow-600 hover:text-yellow-800" onClick={() => handleUnlist(p.id)} title="Unlist">
                      <FaTrash /> Unlist
                    </button>
                  ) : (
                    <button className="text-green-600 hover:text-green-800" onClick={() => handleRelist(p.id)} title="Relist">
                      <FaPlus /> Relist
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input className="border rounded px-2 py-1" name="name" placeholder="Name" value={editForm.name} onChange={handleEditChange} />
              <input className="border rounded px-2 py-1" name="price" placeholder="Price" type="number" value={editForm.price} onChange={handleEditChange} />
              <input className="border rounded px-2 py-1" name="stock" placeholder="Stock" type="number" value={editForm.stock} onChange={handleEditChange} />
              <input className="border rounded px-2 py-1" name="scale" placeholder="Scale" value={editForm.scale} onChange={handleEditChange} />
              <input className="border rounded px-2 py-1" name="grade" placeholder="Grade" value={editForm.grade} onChange={handleEditChange} />
              <input className="border rounded px-2 py-1" name="series" placeholder="Series" value={editForm.series} onChange={handleEditChange} />
              <input className="border rounded px-2 py-1 col-span-2" name="imageUrl" placeholder="Image URL" value={editForm.imageUrl} onChange={handleEditChange} />
            </div>
            <textarea className="border rounded px-2 py-1 w-full mb-4" name="description" placeholder="Description" value={editForm.description} onChange={handleEditChange} rows={3} />
            <div className="flex justify-end gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleEditSave}>Save Changes</button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400" onClick={() => { setShowEdit(false); setEditProduct(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <Paginations 
          numberOfPage={pagination.totalPages}
          totalProducts={pagination.totalElements}
        />
      </div>
    </div>
  );
}

export default SellerProducts; 