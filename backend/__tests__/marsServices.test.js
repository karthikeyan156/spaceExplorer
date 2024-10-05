const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { getMarsRoverImages, getMarsWeather } = require('../services/marsServices.js'); // Adjust the path

const mock = new MockAdapter(axios);

// Mock response data for Mars Rover images
const mockResponseMarsImages = {
  photos: [
    {
      camera: { name: 'FHAZ' },
      img_src: 'http://example.com/image1.jpg',
      earth_date: '2021-01-01',
    },
    {
      camera: { name: 'RHAZ' },
      img_src: 'http://example.com/image2.jpg',
      earth_date: '2021-01-02',
    },
    {
      camera: { name: 'NAVCAM' },
      img_src: 'http://example.com/image3.jpg',
      earth_date: '2021-01-03',
    },
    {
      camera: { name: 'FHAZ' },
      img_src: 'http://example.com/image4.jpg',
      earth_date: '2021-01-04',
    },
    {
      camera: { name: 'FHAZ' },
      img_src: 'http://example.com/image5.jpg',
      earth_date: '2021-01-05',
    },
    {
      camera: { name: 'RHAZ' },
      img_src: 'http://example.com/image6.jpg',
      earth_date: '2021-01-06',
    },
  ],
};

// Mock response data for Mars Weather
const mockResponseMarsWeather = {
  sol_keys: ['1000', '1001'],
  '1000': {
    AT: { av: -30 },
    HWS: { av: 5 },
    PRE: { av: 100 },
    Season: 'summer',
  },
  '1001': {
    AT: { av: -28 },
    HWS: { av: 7 },
    PRE: { av: 110 },
    Season: 'summer',
  },
};

describe('NASA Service Functions', () => {
  afterEach(() => {
    mock.reset();
  });

  describe('getMarsRoverImages', () => {
    it('should fetch Mars Rover images successfully', async () => {
      mock.onGet(/mars-photos/).reply(200, mockResponseMarsImages);

      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMarsRoverImages(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Mars Rover Images Retrieved Successfully",
        data: expect.arrayContaining([
          expect.objectContaining({ camera: { name: 'FHAZ' } }),
          expect.objectContaining({ camera: { name: 'RHAZ' } }),
          expect.objectContaining({ camera: { name: 'NAVCAM' } }),
        ]),
      });
    });

    it('should handle error fetching Mars Rover images', async () => {
      mock.onGet(/mars-photos/).reply(500);

      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMarsRoverImages(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "An error occurred while fetching Mars Rover images." });
    });
  });

  describe('getMarsWeather', () => {
    it('should fetch Mars Weather data successfully', async () => {
      mock.onGet(/insight_weather/).reply(200, mockResponseMarsWeather);

      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMarsWeather(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Mars Weather Data Retrieved Successfully",
        data: expect.arrayContaining([
          expect.objectContaining({ sol: '1000', temperature: -30, windSpeed: 5, pressure: 100, season: 'summer' }),
          expect.objectContaining({ sol: '1001', temperature: -28, windSpeed: 7, pressure: 110, season: 'summer' }),
        ]),
      });
    });

    it('should handle error fetching Mars Weather data', async () => {
      mock.onGet(/insight_weather/).reply(500);

      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getMarsWeather(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "An error occurred while fetching Mars weather data." });
    });
  });
});
