// __tests__/nasaServices.test.js

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { apod, nasaImageAndVideo } from '../services/nasaServices.js'; // Adjust the path as necessary

const mock = new MockAdapter(axios);

describe('NASA Services', () => {
  afterEach(() => {
    mock.reset(); // Reset the mock after each test
  });

  test('apod should return APOD data successfully', async () => {
    const mockResponse = {
      title: 'Test APOD',
      explanation: 'This is a test explanation.',
      url: 'https://example.com/image.jpg',
      media_type: 'image',
    };

    mock.onGet(/apod/).reply(200, mockResponse);

    const req = {}; // Mock request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await apod(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "APOD Data Retrieved Successfully",
      data: mockResponse,
    });
  });

  test('nasaImageAndVideo should return image/video data successfully', async () => {
    const mockQuery = 'Mars'; // Sample search query
    const mockResponse = {
      collection: {
        items: [
          {
            href: 'https://example.com/video.mp4',
            data: [{ title: 'Mars Rover Video' }],
          },
          {
            href: 'https://example.com/image.jpg',
            data: [{ title: 'Mars Rover Image' }],
          },
        ],
      },
    };

    // Mock the search API request
    mock.onGet(/search/).reply(200, mockResponse);

    const req = { body: { query: mockQuery } }; // Mock request with query
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await nasaImageAndVideo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "NASA Image and Video Data fetched successfully",
      data: mockResponse.collection.items, // Expect items returned by the mock response
    });
  });

  test('apod should handle errors', async () => {
    mock.onGet(/apod/).reply(500); // Simulate a server error

    const req = {}; // Mock request
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await apod(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "An error occurred, please try again later." });
  });

  test('nasaImageAndVideo should handle errors', async () => {
    const mockQuery = 'Mars'; // Sample search query
    mock.onGet(/search/).reply(500); // Simulate a server error

    const req = { body: { query: mockQuery } }; // Mock request with query
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await nasaImageAndVideo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred while fetching NASA image/video data.' });
  });
});
