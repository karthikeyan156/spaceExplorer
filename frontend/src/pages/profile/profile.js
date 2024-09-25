
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './profile.module.css';  // Make sure to create and import the corresponding CSS
import NavBar from '../nav';
import Footer from '../footer'
const ProfilePage = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        bio: '',
        profilePicture: ''
    });

    useEffect(() => {
        // Fetch user data from an API
        const fetchData = async () => {
            try {
                const response = {
                    "data":{
                        "name":"James",
                        "email":"james@gmail.com",
                        "bio":"bio is this",

                    }
                }
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
             <NavBar />
       
        <div className={styles.profileContainer}>
           
            <div className={styles.profileHeader}>
            <img
  src="https://headshots-inc.com/wp-content/uploads/2020/12/what-to-wear-for-professional-headshots-1.jpg"
  alt={`${user.name}'s profile`}
  className={styles.profileImage}
  style={{
    width: '150px',
    height: '150px',
    display: 'block',       // Makes the image a block-level element
    marginLeft: 'auto',     // These two properties center it horizontally
    marginRight: 'auto'
  }}
/>
             <h1 className={styles.profileName}>{user.name}</h1>
            </div>
            <div className={styles.profileDetails}>
                <div style={{textAlign:'center'}}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Bio:</strong> {user.bio}</p>
                <p><strong>Designation:</strong> {user.email}</p>
                <p><strong>Degree:</strong> {user.bio}</p>
                <p><strong>Achivements:</strong> {user.email}</p>
                <p><strong>Awards:</strong> {user.bio}</p>
                <p><strong>Links:</strong> {user.email}</p>
                <p><strong>Memberships:</strong> {user.bio}</p>
                </div>
            </div>
            
        </div>
        <Footer />
        </div>
    );
};

export default ProfilePage;
