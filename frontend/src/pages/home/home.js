import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from '../home/Home.module.css'; // Adjust the path as needed
import NavBar from '../nav';
Modal.setAppElement('#root'); // For accessibility reasons

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentQuery, setCurrentQuery] = useState({});
  const [answer, setAnswer] = useState('');
  const [paperSubmissions, setPaperSubmissions] = useState([]);
  const [reviewerQueries, setReviewerQueries] = useState([]);
  const [marsRoverImages, setMarsRoverImages] = useState([]);

  useEffect(() => {


    const fetchMarsRoverImages = async () => {
      try {
        const apiKey = 'your_nasa_api_key';
        const roverImagesResponse = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=VMOjuWEISLCyXMuho1CvGAhXp2N7QF6RGrVdBA60`
        );
        setMarsRoverImages(roverImagesResponse.data.photos);
      } catch (error) {
        console.error('Error fetching Mars Rover images:', error);
      }
    };

    fetchMarsRoverImages();
  }, []);

  const openModal = (query) => {
    setCurrentQuery(query);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAnswer('');
  };

  const handleSubmit = () => {
    alert('Message sent');
    closeModal();
  };

  return (
    <div>
      <NavBar />
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.whiteText}>Explore the Universe</h1>
          <p className={styles.subText}>Discover stunning images and data from NASA's vast archives.</p>
          <Link to="/gallery" className={styles.ctaButton}>View Gallery</Link>
        </div>
      </div>

      {/* Featured Content Section */}
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionTitle}>Story of the Week</h2>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3>Astronomy Picture of the Day</h3>
            <p>Daily stunning images and explanations from the world of astronomy.</p>
          </div>
          <div className={styles.card}>
            <h3>Mars Rover Photos</h3>
            <p>Latest images captured by the rovers exploring the Martian surface.</p>
          </div>
          <div className={styles.card}>
            <h3>Space News</h3>
            <p>Stay updated with the latest happenings in space exploration.</p>
          </div>
        </div>
      </div>

      {/* Mars Rover Carousel */}
      <div className={styles.carouselContainer}>
        <h2 className={styles.sectionTitle}>Latest Mars Rover Images</h2>
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          {marsRoverImages.map((image) => (
            <div key={image.id}>
              <img src={image.img_src} alt={`Mars Rover - ${image.camera.full_name}`} />
              <p className="legend">{image.camera.full_name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Home;
