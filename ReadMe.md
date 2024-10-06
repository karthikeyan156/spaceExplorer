
# SpaceXplorer

SpaceXplorer is website that runs with help of the NASA open apis.
This website consists various features like picture of the day, access to nasa gallery, mars weather and rover images and also subscribe to our newsletter.The frontend of this application is built using React and backend is built on express and nodejs. 

## Features

- View the latest Mars rover images from NASA's Mars Rover Image API
- Display Mars weather data from NASA's Mars Weather API
- Search images from nasa image gallery
- Responsive design 
- Exclusive newsletter subscribe
- Picture of the day on the home page

### Prerequisites

- Node.js 
- NPM 

### Tech 
- React
- express
- Node js

### NASA API 

- Astronomy Picture of the Day (APOD)
- Mars Rover Photos
- NASA Image and Video Library



## Installation

clone this repo : 


```bash
   git clone https://github.com/karthikeyan156/spaceExplorer/tree/main

```
This repo contain code for both frontend and backend. To run 

## Frontend 

```bash
  cd frontend
  npm Install
```

 This will install all the required libs for the project and once Install is sucessfull then run

  ```bash
  npm start
```  

This should run the project in port 3000 and you can find the link in the terminal where the project is running. click that link to redirect to the website. if all Installation is good then you should see the homepage. 

## Backend
now open a new terminal and run

```bash
  cd backend
  npm Install
```

 This will install all the required libs for the project and once Install is sucessfull then run

```bash
  npm start
```  

This should run the project in port 2000 and you can verify it by sending any requests.

To test backend is working, send a request 

 ```bash
  curl http://localhost:2000/
```  
 This request should return "Hello World!!".IF you see this then congratulations!!! you have sucessfully completed setting up your project and now explore the code. 


## Testing

To unit test the services , run 

 ```bash
  npm test
``` 
You should be able to see the no of test ran and no of test passed or failed.




## API documentation

- ### GET ``` /nasa/apod```

#### Response:

```
{
    "message": "APOD Data Retrieved Successfully",
    "data": {
        "copyright": "Francesco Sferlazza, Franco Sgueglia",
        "date": "2024-10-05",
        "explanation": "While hunting for comets in the 
        skies above 18th century France, astronomer Charles Messier ",
        "hdurl": "https://apod.nasa.gov/apod/image/2410/m27_RGB_CC_FLAT_MEW.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "M27: Not a Comet",
        "url": "https://apod.nasa.gov/apod/image/2410/m27_RGB_CC_FLAT_MEW1024.jpg"
    }
}
```


- ### POST ```/nasa/gallery```

#### Request:

```
{
    "query":"earth"
}
```


#### Response:

```
{
    "message": "NASA Image and Video Data fetched successfully",
    "data": [
        {
            "href": "https://images-assets.nasa.gov/image/PIA00342/collection.json",
            "data": [
                {
                    "center": "JPL",
                    "title": "The Earth & Moon",
                    "nasa_id": "PIA00342",
                    "date_created": "1998-06-04T18:10:28Z",
                    "keywords": [
                        "Earth",
                        "Galileo"
                    ],
                    "media_type": "image",
                    "description_508": "During its flight, NASA’s Galileo spacecraft returned images of the Earth and Moon. Separate images of the Earth and Moon were combined to generate this view. ",
                    "secondary_creator": "NASA/JPL/USGS",
                    "description": "During its flight, NASA’s Galileo spacecraft returned images of the Earth and Moon. Separate images of the Earth and Moon were combined to generate this view.  http://photojournal.jpl.nasa.gov/catalog/PIA00342"
                }
            ], ....
```

- ### GET ```/mars/weather```

#### Response:

```
{
    "message": "Mars Weather Data Retrieved Successfully",
    "data": [
        {
            "sol": "675",
            "temperature": -62.314,
            "windSpeed": 7.233,
            "pressure": 750.563,
            "season": "fall"
        },
        {
            "sol": "676",
            "temperature": -62.812,
            "windSpeed": 8.526,
            "pressure": 749.09,
            "season": "fall"
        },
        {
            "sol": "677",
            "temperature": -63.056,
            "windSpeed": 7.887,
            "pressure": 748.698,
            "season": "fall"
        },
        {
            "sol": "678",
            "temperature": -62.562,
            "windSpeed": 5.246,
            "pressure": 743.741,
            "season": "fall"
        },
        {
            "sol": "679",
            "temperature": -62.551,
            "windSpeed": 5.565,
            "pressure": 744.529,
            "season": "fall"
        },
        {
            "sol": "680",
            "temperature": -61.789,
            "windSpeed": 6.517,
            "pressure": 743.99,
            "season": "fall"
        },
        {
            "sol": "681",
            "temperature": -62.434,
            "windSpeed": 5.632,
            "pressure": 743.55,
            "season": "fall"
        }
    ]
}
```

- ### GET ```/mars/rover```

#### Response:


```
{
    "message": "Mars Rover Images Retrieved Successfully",
    "data": [
        {
            "id": 102693,
            "sol": 1000,
            "camera": {
                "id": 20,
                "name": "FHAZ",
                "rover_id": 5,
                "full_name": "Front Hazard Avoidance Camera"
            },
            "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
            "earth_date": "2015-05-30",
            "rover": {
                "id": 5,
                "name": "Curiosity",
                "landing_date": "2012-08-06",
                "launch_date": "2011-11-26",
                "status": "active",
                "max_sol": 4102,
                "max_date": "2024-02-19",
                "total_photos": 695670,
                "cameras": [
                    {
                        "name": "FHAZ",
                        "full_name": "Front Hazard Avoidance Camera"
                    },
                    {
                        "name": "NAVCAM",
                        "full_name": "Navigation Camera"
                    }
                ]    
            }

        }   
    ]   
}                     
```
# Hi, I'm Karthikeyan ! 👋
I am a dedicated Software Engineering student with a passion for continuous learning and a strong interest in developing websites and backend services. Having completed my Master’s in Software Engineering, I possess two years of professional experience as an AWS Developer, specializing in Node.js and Java. I thrive on tackling challenging projects and am eager to contribute my skills in a dynamic and innovative environment.

## 🚀 About Me
I'm a AWS Developer , worked on developing APIs using nodejs and java spring. I have also worked on developing batch jobs in nodejs and deployed them in aws batches. I have worked in various aws services like S3, ECR, Lambdas , ELB , Batch , EKS , secret manager, parameter store, Glue jobs, step fucntions . 


## 🛠 Skills
Javascript, React , AWS , Java , spring , GraphQL . 


## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)


