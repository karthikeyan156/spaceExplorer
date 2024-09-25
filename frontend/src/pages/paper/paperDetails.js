

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './paperDetails.css';
import NavBar from '../nav';
function PaperDetails() {
  const { paperId } = useParams();
  const [paper, setPaper] = useState({});
  const [review, setReview] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const fetchPaperDetails = async () => {
      try {
        const endpoint = `http://localhost:3000/paper/getPaper`;
        const requestBody = { id: paperId };
        const response = await axios.post(endpoint, requestBody);
        setPaper(response.data);
        setReview(response.data.overallReview || ''); // Set the review text area to show the fetched overall review
        setIsPublished(response.data.paperState === 'published'); // Set if the paper is published
      } catch (error) {
        console.error('Error fetching paper details:', error);
      }
    };
    fetchPaperDetails();
  }, [paperId]);

  const handleSubmitResponse = async (status) => {
    try {
      const endpoint = `http://localhost:3000/paper/editPaper`;
      let isApproved, paperStatus, paperState;

      switch (status) {
        case "Accepted":
        case "Rejected":
          paperStatus = status.toUpperCase();
          isApproved = status === "Accepted";
          paperState = "published";
          break;
        default:
          paperStatus = "UNDER REVIEW";
          isApproved = false;
          paperState = "draft";
          break;
      }

      const requestBody = {
        _id: paperId,
        overallReview: review,
        paperState: paperState,
        isApproved: isApproved,
        paperStatus: paperStatus,
      };
      const response = await axios.post(endpoint, requestBody);
      if (response.status === 200) {
        alert(`Paper status updated to: ${status}`);
        setIsPublished(paperState === 'published'); // Update state based on the new status
        if (paperState === 'published') {
          setReview(review); // Maintain the current review in the textarea
        }
      } else {
        alert('Failed to update paper status');
      }
    } catch (error) {
      console.error('Error updating paper status:', error);
      alert('Error submitting paper status');
    }

    
  };
  const handleDownload = async () => {
    const endpoint = `http://localhost:3000/paper/sendPaper`;
    try {
      const response = await axios.post(endpoint, { id: paperId }, {
        responseType: 'blob'  // This ensures that the binary data of the PDF is handled correctly
      });
  
      // Create a Blob from the PDF Stream
      const file = new Blob(
        [response.data], 
        { type: 'application/pdf' }  // This specifies the Blob type
      );
  
      // Build a URL from the file
      const fileURL = URL.createObjectURL(file);
  
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', `Paper_${paperId}.pdf`); // Set the default filename for the download
      document.body.appendChild(link);
  
      // Programmatically click the link to trigger the download
      link.click();
  
      // Clean up by revoking the Blob URL and removing the link
      URL.revokeObjectURL(fileURL);
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
      alert('Failed to download the file, please try again.');
    }
  };

  return (
    <div>
        <NavBar />
    <div className="paper-details-container">
    
      <h2>{paper.paperName}</h2>
      <p><strong>Author:</strong> {paper.paperAuthor}</p>
      <p><strong>Paper ID:</strong> {paperId}</p>
      <p><strong>Location:</strong> {paper.paperLocation}</p>
      <p><strong>Date:</strong> {paper.createdAt?.slice(0, 10)}</p>
      <p><strong>Score:</strong> {paper.totalMarks}</p>
      <p><strong>Status:</strong> {paper.isApproved ? 'Approved' : 'Not Approved'}</p>
      <p><strong>Overall Review:</strong> {paper.overallReview}</p>
      <p><strong>Paper State:</strong> {paper.paperState}</p>
      <p><strong>Paper Status:</strong> {paper.paperStatus}</p>
      <p><strong>Abstract:</strong> {paper.abstract}</p>
      
      {paper.reviewers && paper.reviewers.length > 0 && (
        <div>
          <h3>Reviewers</h3>
          <div className="reviewers">
            {paper.reviewers.map((reviewer, index) => (
              <div key={index} className="reviewer-card">
                <h4>{reviewer.name}</h4>
                <p><strong>Overall Score:</strong> {reviewer.overallScore}</p>
                <p><strong>Comments:</strong> {reviewer.privateComments}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {paper.paperLocation && (
       <p>
       <strong>Paper PDF:</strong>
       <a href="#" onClick={handleDownload}>Download PDF</a>
     </p>
      )}
      <textarea 
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Enter your review here..."
        disabled={isPublished} // Disable the textarea if the paper is published
        className={isPublished ? 'disabledTextarea' : ''}
      />
      <div className="buttons">
        <button type="button" className="accept" onClick={() => handleSubmitResponse('Accepted')}>Accept</button>
        <button type="button" className="reject" onClick={() => handleSubmitResponse('Rejected')}>Reject</button>
        <button type="button" className="draft" onClick={() => handleSubmitResponse('Draft')}>Save & Continue</button>
      </div>
    </div>
    </div>
  );
}

export default PaperDetails;
