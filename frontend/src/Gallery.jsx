import React, { useState, useEffect } from 'react';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        console.log('Fetched images:', data);
        if (isMounted) {
          setImages(data); 
        }
      } catch (error) {
        console.error('Fetch error:', error);
        if (isMounted) {
          setImages([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, []);

  const groupedImages = {};
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const category = image.category || 'uncategorized';
    if (!groupedImages[category]) {
      groupedImages[category] = [];
    }
    groupedImages[category].push(image);
  }

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <h1>Photo Gallery</h1>
      {!loading && images.length === 0 ? (
        <p>No images available.</p>
      ) : (
        Object.entries(groupedImages).map(([category, imgs]) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="image-grid">
              {imgs.map(img => (
                <img
                  key={img._id}
                  src={img.path}
                  alt={img.title}
                  width="200"
                  height="300"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
