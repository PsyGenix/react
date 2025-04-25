import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('available');
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      console.log('Checking authentication status...');
      try {
        const response = await fetch('/api/auth/status', {
          credentials: 'include',
        });
        console.log('Auth status response:', response.status, response.statusText);
        if (!response.ok) throw new Error('Auth check failed');
        const data = await response.json();
        console.log('Auth status data:', data);
        setIsAuthenticated(data.isAuthenticated);
      } catch (err) {
        console.error('Auth check error:', err.message);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Fetch images on mount (if authenticated)
  useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;

    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery', {
          credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        console.log('Fetched images:', data);
        if (isMounted) {
          setImages(data); // [{ _id, path, title, category }, ...]
        }
      } catch (error) {
        console.error('Fetch images error:', error);
        if (isMounted) {
          setImages([]);
        }
      } finally {
        if (isMounted) {
          setLoadingImages(false);
        }
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { username, password });
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      console.log('Login response:', response.status, response.statusText);
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      console.log('Login data:', data);
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Login error:', err.message);
      alert('Login failed: Invalid credentials');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    console.log('Attempting logout...');
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      console.log('Logout response:', response.status, response.statusText);
      if (!response.ok) throw new Error('Logout failed');
      setIsAuthenticated(false);
      setImages([]); // Clear images on logout
      setLoadingImages(true);
    } catch (err) {
      console.error('Logout error:', err.message);
      alert('Logout failed');
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', category);
    console.log('Uploading image with:', { title, category, image: image.name });
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      console.log('Image upload response:', response.status, response.statusText);
      if (!response.ok) throw new Error('Image upload failed');
      const data = await response.json();
      console.log('Image upload data:', data);
      // Refresh images after upload
      const imagesResponse = await fetch('/api/gallery', { credentials: 'include' });
      if (!imagesResponse.ok) throw new Error('Failed to fetch images');
      const newImages = await imagesResponse.json();
      setImages(newImages);
      alert('Image uploaded successfully');
      setImage(null);
      setTitle('');
      setCategory('');
    } catch (err) {
      console.error('Image upload error:', err.message);
      alert('Image upload failed');
    }
  };

  // Handle image deletion
  const handleImageDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    console.log('Deleting image with ID:', imageId);
    try {
      const response = await fetch(`/api/gallery/${imageId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      console.log('Delete response:', response.status, response.statusText);
      if (!response.ok) throw new Error('Image deletion failed');
      // Remove deleted image from state
      setImages(images.filter(img => img._id !== imageId));
      alert('Image deleted successfully');
    } catch (err) {
      console.error('Delete error:', err.message);
      alert('Image deletion failed');
    }
  };

  // Handle booking date submission
  const handleDateSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      alert('Please select a date');
      return;
    }
    console.log('Submitting booking:', { date, status });
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ date, status }),
      });
      console.log('Booking response:', response.status, response.statusText);
      if (!response.ok) throw new Error('Date update failed');
      const data = await response.json();
      console.log('Booking data:', data);
      alert('Date updated successfully');
      setDate('');
      setStatus('available');
    } catch (err) {
      console.error('Booking error:', err.message);
      alert('Date update failed');
    }
  };

  // Group images by category
  const groupedImages = {};
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const category = image.category || 'uncategorized';
    if (!groupedImages[category]) {
      groupedImages[category] = [];
    }
    groupedImages[category].push(image);
  }

  console.log('Rendering Admin component, isAuthenticated:', isAuthenticated);
  if (!isAuthenticated) {
    console.log('Rendering login form');
    return (
      <div className="admin-login">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  console.log('Rendering admin panel');
  return (
  
    <>
    
 
     
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</button>
  <div>
    <section>
        <h2>Manage Booking Dates</h2>
        <form onSubmit={handleDateSubmit}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
          </select>
          <button type="submit">Set Date</button>
        </form>
      </section>
    </div>

      <section>
        <h2>Upload Image</h2>
        <form onSubmit={handleImageUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category (e.g., Weddings)"
          />
          <button type="submit">Upload Image</button>
        </form>
      </section>

      <section>
        <h2>Manage Images</h2>
        {loadingImages ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : images.length === 0 ? (
          <p>No images available.</p>
        ) : (
          Object.entries(groupedImages).map(([category, imgs]) => (
            <div key={category} className="category-section">
              <h3>{category}</h3>
              <div className="image-grid">
                {imgs.map(img => (
                  <div key={img._id} className="image-item">
                    <img
                      src={img.path}
                      alt={img.title}
                      width="100"
                      height="150"
                      loading="lazy"
                    />
                    <p>{img.title}</p>
                    <button
                      onClick={() => handleImageDelete(img._id)}
                      style={{ marginTop: '5px', color: 'white' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

         </div>
    </>
  );
}
