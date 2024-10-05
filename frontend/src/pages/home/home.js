import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import styles from '../home/Home.module.css'; // Adjust the path as needed
import NavBar from '../nav';

Modal.setAppElement('#root'); // For accessibility reasons

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [apod, setApod] = useState({});
  const [currentQuery, setCurrentQuery] = useState({});
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [currentDate, setCurrentDate] = useState(''); // State for current date

  useEffect(() => {
    // Fetch NASA's APOD (Astronomy Picture of the Day)
    const fetchApod = async () => {
      try {
        const url = process.env.REACT_APP_API_ENDPOINT;
        const response = await axios.get(`${url}/nasa/apod`);
        setApod(response.data.data);
      } catch (error) {
        console.error('Error fetching APOD:', error);
      }
    };

    // Set the current date when the component mounts
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString(undefined, options)); // Format the date

    fetchApod();
  }, []);

  const openModal = (query) => {
    setCurrentQuery(query);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    setEmailSent(false);
    setEmailError(null);

    try {
      // Send email to the backend
      const response = await axios.post('http://localhost:2000/user/subscribe', { email });

      if (response.status === 200) {
        setEmailSent(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing to the newsletter:', error);
      setEmailError('Error subscribing. Please try again.');
    }
  };

  return (
    <div>
      <NavBar />

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.whiteText}>Explore the Universe</p>
          <p className={styles.subText}>Discover stunning images and data from NASA's vast archives.</p>
          <Link to="/gallery" className={styles.ctaButton}>View Gallery</Link>
        </div>
      </div>

      {/* Current Date */}
      <div className={styles.currentDate}>
        <p className={styles.dateText}>Today's Date: {currentDate}</p>
      </div>

      {/* NASA Picture of the Day Section */}
      <div className={styles.apodContainer}>
        <div className={styles.apodContent}>
          {apod.media_type === 'image' ? (
            <img src={apod.url} alt={apod.title} className={styles.apodImage} />
          ) : (
            <iframe
              title={apod.title}
              src={apod.url}
              frameBorder="0"
              className={styles.apodVideo}
              allowFullScreen
            />
          )}
          <div className={styles.apodText}>
            <h3>{apod.title}</h3>
            <p>{apod.explanation}</p>
            <p><strong>Date:</strong> {apod.date}</p> {/* Use the date from APOD data */}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className={styles.newsletterSection}>
        <h2 className={styles.sectionTitle}>Subscribe to our Newsletter</h2>
        <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>Subscribe</button>
        </form>
        {emailSent && <p className={styles.successMessage}>Thank you for subscribing!</p>}
        {emailError && <p className={styles.errorMessage}>{emailError}</p>}
      </div>

      {/* Modal for Expanded Content (Optional) */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>{currentQuery.title}</h2>
          <p>{currentQuery.description}</p>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
