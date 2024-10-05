import axios from 'axios';

export async function getMarsRoverImages(req, res) {
  try {
    const nasaApiKey = process.env.NASA_API_KEY;

    console.log(nasaApiKey);
    // NASA Mars Rover Photos API URL
    const marsRoverUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${nasaApiKey}`;

    const response = await axios.get(marsRoverUrl);
    const roverImages = response.data.photos;

    // Limit to 5 images from each camera type
    const limitedImages = roverImages.reduce((acc, photo) => {
      const cameraName = photo.camera.name;
      if (!acc[cameraName]) acc[cameraName] = [];
      if (acc[cameraName].length < 5) acc[cameraName].push(photo);
      return acc;
    }, {});

    // Flatten the result into an array of images
    const finalImages = Object.values(limitedImages).flat();

    res.status(200).json({
      message: "Mars Rover Images Retrieved Successfully",
      data: finalImages,
    });
  } catch (err) {
    console.log("Error fetching Mars Rover images:", err);
    res.status(500).json({ message: "An error occurred while fetching Mars Rover images." });
  }
}

// Function to fetch Mars Weather data
export async function getMarsWeather(req, res) {
  try {
    const nasaApiKey = process.env.NASA_API_KEY;

    // NASA InSight Mars Weather API endpoint
    const marsWeatherUrl = `https://api.nasa.gov/insight_weather/?api_key=${nasaApiKey}&feedtype=json&ver=1.0`;

    const response = await axios.get(marsWeatherUrl);
    const weatherData = response.data;

    // Format weather data or return it directly
    const solKeys = weatherData.sol_keys; // Sols (Martian days) with available weather data
    const formattedWeatherData = solKeys.map(sol => ({
      sol,
      temperature: weatherData[sol].AT?.av,
      windSpeed: weatherData[sol].HWS?.av,
      pressure: weatherData[sol].PRE?.av,
      season: weatherData[sol].Season,
    }));

    res.status(200).json({
      message: "Mars Weather Data Retrieved Successfully",
      data: formattedWeatherData,
    });
  } catch (err) {
    console.log("Error fetching Mars weather data:", err);
    res.status(500).json({ message: "An error occurred while fetching Mars weather data." });
  }
}
