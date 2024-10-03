import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './gallery.module.css'; 
import NavBar from '../nav';

function Gallery() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('Earth');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // For modal

  useEffect(() => {
    const source = axios.CancelToken.source(); 
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.post(
          `http://localhost:2000/nasa/gallery`, 
          { query },  
          { cancelToken: source.token }
        );
  
        if (response.data && response.data.data) {
          setItems(response.data.data);
        } else {
          setError('No data found for this search query.');
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching data from NASA API:', error);
          setError('Error fetching data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  
    return () => {
      source.cancel('Component unmounted. Operation canceled.');
    };
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.searchTerm.value.trim();
    if (searchTerm) {
      setQuery(searchTerm);
    }
  };

  const handleReadMore = (item) => {
    setSelectedItem(item); // Set the selected item for modal
  };

  const closeModal = () => {
    setSelectedItem(null); // Close the modal
  };

  return (
    <div>
      <NavBar /> 
      
      <div className={styles.galleryContainer}>
        <h1>NASA Image and Video Gallery</h1>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input 
            type="text" 
            name="searchTerm" 
            placeholder="Search for Earth, Moon, Mars..." 
            className={styles.searchInput} 
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}

        {!loading && !error && (
          <div className={styles.gridContainer}>
            {items.map((item) => (
              <div key={item.data[0].nasa_id} className={styles.gridItem}>
                {item.links && item.links[0].href ? (
                  item.data[0].media_type === 'image' ? (
                    <img 
                      src={item.links[0].href} 
                      alt={item.data[0].title} 
                      className={styles.thumbnail} 
                    />
                  ) : (
                    <video controls className={styles.thumbnail}>
                      <source src={item.links[0].href} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  <p>Media unavailable</p>
                )}
                <div className={styles.caption}>
                  <h3>{item.data[0].title}</h3>
                  <p>{item.data[0].description || 'No description available.'}</p>
                  <span 
                    className={styles.readMore} 
                    onClick={() => handleReadMore(item)}>
                    Read more
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for displaying the full content */}
        {selectedItem && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <span className={styles.closeButton} onClick={closeModal}>&times;</span>
              {selectedItem.links && selectedItem.links[0].href ? (
                selectedItem.data[0].media_type === 'image' ? (
                  <img 
                    src={selectedItem.links[0].href} 
                    alt={selectedItem.data[0].title} 
                    className={styles.modalImage}
                  />
                ) : (
                  <video controls className={styles.modalImage}>
                    <source src={selectedItem.links[0].href} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <p>Media unavailable</p>
              )}
              <h2>{selectedItem.data[0].title}</h2>
              <p>{selectedItem.data[0].description || 'No description available.'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;
