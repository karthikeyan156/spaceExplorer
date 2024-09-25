import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './about.module.css';
import NavBar from '../nav';
import Footer from '../footer';
const About = () => {
  const [pictures] = useState([
    { src: 'https://fourwaves.com/media/jjtaaupz/conference-speaker.jpg?quality=100&rnd=132864618244570000', alt: 'Image 1 Description' },
    { src: 'https://assets-global.website-files.com/61f29c609f84a86e418fbcfb/642d332da355e80399992edf_Conferences%20vs%20meetings.jpg', alt: 'Image 2 Description' },
  ]);

  const [citations] = useState([
    { title: 'Citation Title 1', detail: 'Detail about Citation 1' },
    { title: 'Citation Title 2', detail: 'Detail about Citation 2' },
  ]);

  const [people] = useState([
    { img: 'https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2023/03/23/123808_1362296.jpeg.1500x1000_q95_crop-smart_upscale.jpg', name: 'Dr. John Doe', qualification: 'PhD in Computer Science', quote: 'Innovation distinguishes between a leader and a follower.' },
    { img: 'https://images.freeimages.com/images/premium/previews/8573/8573414-professor.jpg', name: 'Dr. Jane Smith', qualification: 'PhD in Artificial Intelligence', quote: 'The only way to predict the future is to have power to shape the future.' },
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div>
        <NavBar />
   
    <div className={styles.aboutContainer}>
     
      <section className={styles.picturesSection}>
        <h2>Gallery</h2>
        <Slider {...settings}>  {/* Use Slider component here */}
          {pictures.map((picture, index) => (
            <div key={index} className={styles.imageContainer}>
              <img src={picture.src} alt={picture.alt} className={styles.organizationPicture} />
            </div>
          ))}
        </Slider>
      </section>

      <section className={styles.citationsSection}>
        <h2>Published Citations</h2>
        <Slider {...settings}>
          {citations.map((citation, index) => (
            <article key={index} className={styles.citation}>
              <h3>{citation.title}</h3>
              <p>{citation.detail}</p>
            </article>
          ))}
        </Slider>
      </section>

      <section className={styles.peopleSection}>
        <h2>Our Team</h2>
        <Slider {...settings}>
          {people.map((person, index) => (
            <div key={index} className={styles.personProfile}>
              <img src={person.img} alt={`Profile of ${person.name}`} className={styles.profilePicture} />
              <div>
                <h3>{person.name}</h3>
                <p>{person.qualification}</p>
                <blockquote>{`"${person.quote}"`}</blockquote>
              </div>
            </div> 
          ))}
        </Slider>
      </section>
     
          </div>
          <Footer />
          </div>
  );
};

export default About;
