// import React, { useState } from 'react';
// import Navbar from '../nav';
// import Footer from '../footer';
// import logo from 'https://png.pngtree.com/templates/20180813/community-organization-logo-design-template-png_28632.jpg'; // Make sure to import your logo

// const ContactPage = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         message: ''
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission logic here, e.g., send data to a server
//         console.log(formData);
//         alert("Message sent!");
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="contact-page-container">
//                 <div className="contact-details">
//                     <img src='https://png.pngtree.com/templates/20180813/community-organization-logo-design-template-png_28632.jpg' alt="Organization Logo" className="org-logo" />
//                     <h2>Contact Us</h2>
//                     <p>Please fill out the form to get in touch with us.</p>
//                 </div>
//                 <div className="contact-form-container">
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="name">Name:</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                         />

//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />

//                         <label htmlFor="message">Message:</label>
//                         <textarea
//                             id="message"
//                             name="message"
//                             value={formData.message}
//                             onChange={handleChange}
//                         />

//                         <button type="submit">Send Message</button>
//                     </form>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default ContactPage;
