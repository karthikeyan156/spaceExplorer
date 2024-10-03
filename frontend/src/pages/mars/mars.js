import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../mars/mars.module.css';
import NavBar from '../nav';

function Mars() {
  const [roverImages, setRoverImages] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limitImagesPerCamera = (photos, limit = 5) => {
    const cameraGroups = photos.reduce((groups, photo) => {
      const { camera } = photo;
      groups[camera.full_name] = groups[camera.full_name] || [];
      if (groups[camera.full_name].length < limit) {
        groups[camera.full_name].push(photo);
      }
      return groups;
    }, {});

    return Object.values(cameraGroups).flat();
  };

  useEffect(() => {
    const fetchMarsData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Mars Rover Image API
        const roverResponse = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY`
        );
        // Limit images to 5 per camera
        const limitedRoverImages = limitImagesPerCamera(roverResponse.data.photos);
        setRoverImages(limitedRoverImages);

        // Mars Weather API
        const weatherResponse = await axios.get(
          `https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0`
        );
        const latestSol = weatherResponse.data.sol_keys[0];
        setWeather(weatherResponse.data[latestSol]);

        setLoading(false);
      } catch (error) {
        setError(JSON.stringify(error));
        setLoading(false);
      }
    };

    fetchMarsData();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
    <div className={styles.marsContainer}>
      <h1 className={styles.pageTitle}>Explore Mars</h1>
      
      {loading ? (
        <p>Loading Mars data...</p>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <>
          {/* Mars Weather Section */}
          <div className={styles.weatherContainer}>
            <h2>Mars Weather</h2>
            <p><strong>Temperature:</strong> {weather.AT?.av.toFixed(1)}°C</p>
            <p><strong>Wind Speed:</strong> {weather.HWS?.av.toFixed(1)} m/s</p>
            <p><strong>Pressure:</strong> {weather.PRE?.av.toFixed(1)} Pa</p>
          </div>

          {/* Mars Rover Images Section */}
          <div className={styles.imageGrid}>
            <h2>Mars Rover Images</h2>
            {roverImages.map((image) => (
              <div key={image.id} className={styles.imageCard}>
                <img src={image.img_src} alt={`Mars Rover - ${image.rover.name}`} className={styles.roverImage} />
                <p><strong>Rover:</strong> {image.rover.name}</p>
                <p><strong>Camera:</strong> {image.camera.full_name}</p>
                <p><strong>Date:</strong> {image.earth_date}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
}

export default Mars;
