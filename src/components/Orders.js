import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, XCircle, Loader2, Info, ShoppingBag, Truck, Calendar, Wallet } from 'lucide-react';

const UserOrders = () => {
  const [username, setUsername] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Set the default font-family for the body if not already set globally
  useEffect(() => {
    document.body.style.fontFamily = 'Inter, sans-serif';
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      fetchOrders(storedUsername);
    } else {
      setError('⚠️ Please log in to view your orders.');
      setLoading(false);
    }
  }, []);

  const fetchOrders = async (user) => {
    setLoading(true);
    try {
      const response = await axios.get(`/order/user/${user}`);
      setOrders(response.data || []); // Ensure it's an array even if empty
      setError('');
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('❌ Failed to fetch orders. Please ensure you are logged in or try again later.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const removeOrder = (orderId) => {
    // This function currently only removes from the UI state.
    // In a real application, you would also make an API call to delete the order from the backend.
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    // Optional: Add a confirmation modal before removing
    // alert(`Order with ID ${orderId} removed from view. (Note: This is a UI-only removal)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 sm:p-10 font-inter">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-indigo-700 text-white p-6 rounded-t-xl flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
            <ShoppingBag size={32} /> Your Orders
          </h1>
          <p className="text-xl font-medium">👋 {username || 'Guest'}</p>
        </header>

        <main className="p-6 sm:p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg flex items-center gap-3 mb-6">
              <XCircle size={24} />
              <p className="text-lg font-medium">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 size={48} className="animate-spin text-indigo-500 mb-4" />
              <p className="text-xl text-gray-700 font-medium">Loading your orders...</p>
            </div>
          ) : orders.length === 0 && !error ? (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-4 rounded-lg flex flex-col items-center gap-3 text-center">
              <Info size={36} className="text-blue-500" />
              <p className="text-xl font-semibold">No orders found for this user.</p>
              <p className="text-md text-blue-600">Start shopping now to see your orders here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col"
                >
                  <img
                    src={order.image_url || `https://placehold.co/400x300/e0e0e0/555555?text=No+Image`}
                    alt={order.item_name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/e0e0e0/555555?text=No+Image`; }}
                  />
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                        {order.item_name}
                      </h3>
                      <div className="space-y-1 text-gray-600 text-sm">
                        <p className="flex items-center gap-2"><Package size={16} className="text-indigo-500" /> <strong>Qty:</strong> {order.quantity}</p>
                        <p className="flex items-center gap-2"><Wallet size={16} className="text-green-600" /> <strong>Price:</strong> ₹{order.price.toFixed(2)}</p>
                        <p className="flex items-center gap-2"><Truck size={16} className="text-purple-500" /> <strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                        {order.seller_name && <p className="flex items-center gap-2"><Info size={16} className="text-gray-500" /> <strong>Seller:</strong> {order.seller_name}</p>}
                        {order.payment_method && <p className="flex items-center gap-2"><Wallet size={16} className="text-blue-500" /> <strong>Paid Via:</strong> {order.payment_method.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</p>}
                        {order.address && <p className="flex items-center gap-2"><Info size={16} className="text-teal-500" /> <strong>Address:</strong> {order.address}</p>}
                        {order.created_at && (
                          <p className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar size={14} className="text-gray-400" /> 
                            <span className="font-medium">Ordered On:</span> {new Date(order.created_at).toLocaleString('en-IN', {
                                year: 'numeric', month: 'short', day: 'numeric',
                                hour: '2-digit', minute: '2-digit', second: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeOrder(order.id)}
                      className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200 ease-in-out flex items-center justify-center gap-2 group"
                    >
                      <span className="group-hover:animate-shake">🗑️</span> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserOrders;
