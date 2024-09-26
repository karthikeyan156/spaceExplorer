import styles from './gallery.module.css';  // Make sure to create and import the corresponding CSS
import NavBar from '../nav';
import Footer from '../footer'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gallery() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('Earth'); // Default query set to "Earth"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/search?q=${query}&media_type=image,video`
        );
        setItems(response.data.collection.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from NASA API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.searchTerm.value;
    setQuery(searchTerm);
  };

  return (
    <div> 
      <NavBar></NavBar>
    <div className={styles.galleryContainer}>
      <h1>NASA Image and Video Gallery</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input 
          type="text" 
          name="searchTerm" 
          placeholder="Search for Earth, Moon, Mars..." 
          className={styles.searchInput} 
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.gridContainer}>
          {items.map((item) => (
            <div key={item.data[0].nasa_id} className={styles.gridItem}>
              {item.links && item.links[0].href ? (
                <img src={item.links[0].href} alt={item.data[0].title} className={styles.thumbnail} />
              ) : (
                <video controls className={styles.thumbnail}>
                  <source src={item.href} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className={styles.caption}>
                <h3>{item.data[0].title}</h3>
                <p>{item.data[0].description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default Gallery;
