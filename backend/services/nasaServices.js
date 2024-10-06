import axios from 'axios';

export async function apod(req, res) {
  try {
    // Fetching data from NASA APOD API
    const nasaApiKey = process.env.NASA_API_KEY;
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`);
    const apodData = response.data;

    res.status(200).json({
      message: "APOD Data Retrieved Successfully",
      data: apodData
    });
  } catch (err) {
    console.log("Error fetching APOD data:", err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
}

export async function nasaImageAndVideo(req, res) {
  try {
    const searchQuery  = req; 
    // NASA Image and Video Library API URL
    const nasaApiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchQuery.body.query)}&media_type=image`;
   
    // Make the API request
    const response = await axios.get(nasaApiUrl);
    console.log(response.data.collection)
    // Send the data back to the frontend
    res.status(200).json({
      message: "NASA Image and Video Data fetched successfully",
      data: response.data.collection.items, // Items returned by NASA API
    });
  } catch (error) {
    console.error('Error fetching NASA image/video data:', error);
    res.status(500).json({ message: 'An error occurred while fetching NASA image/video data.' });
  }
}

