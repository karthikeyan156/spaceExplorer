import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './paper.module.css';
import NavBar from '../nav';
function Paper() {
  const navigate = useNavigate();
  const [sortedPapers, setSortedPapers] = useState([]);

  useEffect(() => {
    // Function to fetch papers data
    const fetchPapers = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:3000/paper/listAll');
        console.log(response.data)
        setSortedPapers(response.data); // Assuming the API returns an array of papers
      } catch (error) {
        console.error('Error fetching papers:', error);
      }
    };

    fetchPapers();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleSortChange = (e) => {
    const value = e.target.value;
    let sorted = [...sortedPapers];
    switch(value) {
      case 'marksHighToLow':
        sorted.sort((a, b) => b.totalMarks - a.totalMarks);
        break;
      case 'marksLowToHigh':
        sorted.sort((a, b) => a.totalMarks - b.totalMarks);
        break;
      case 'acceptedFirst':
        sorted.sort((a, b) => (a.isApproved === b.isApproved) ? 0 : a.isApproved ? -1 : 1);
        break;
      case 'rejectedFirst':
        sorted.sort((a, b) => (a.isApproved === b.isApproved) ? 0 : a.isApproved ? 1 : -1);
        break;
      default:
        // No default sorting needed as the original order comes from the API
    }
    setSortedPapers(sorted);
  };

  const handlePaperClick = (_id) => {
    navigate(`/paperDetails/${_id}`);
  };

  return (
    <div className={styles.paperContainer}>
      < NavBar />
      <div className={styles.header}>
        <h2>Papers</h2>
        <select onChange={handleSortChange} className={styles.dropdown}>
          <option value="marksHighToLow">Sort by Marks (High to Low)</option>
          <option value="marksLowToHigh">Sort by Marks (Low to High)</option>
          <option value="acceptedFirst">Sort by Accepted First</option>
          <option value="rejectedFirst">Sort by Rejected First</option>
        </select>
      </div>
      <section className={styles.submissionsSection}>
        <ul className={styles.paperList}>
          {sortedPapers.map((paper) => (
            <li key={paper._id} className={styles.paperItem} onClick={() => handlePaperClick(paper._id)}>
              <div className={styles.paperTitle}>{paper.paperName}</div>
              <div className={styles.paperAuthor}>{`by ${paper.paperAuthor} - Marks: ${paper.totalMarks}`}</div>
              <div className={paper.isApproved ? styles.acceptanceStatus : styles.rejectionStatus}>
                {paper.isApproved ? 'Accepted' : 'Rejected'}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Paper;
