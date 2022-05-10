# Web Automation Project

In this application we Scrap data from various data sources. [ Mostly healthcare facility websites in the US ] and Store those data into a database. We provide a searchable interface where users can search for facilities based on the state, city or even the facility name.

If queried listing is not found, user can make a request and the system will fetch the given info.

Users can also view the different facility details. They can upload images of these facilities so that other users can be benefitted.

### Application

Live Demo: [Link](https://react-mui-search.vercel.app/)

![Crawler](documentation/diagrams/web-page-1.png?raw=true 'Crawler Architecture')

### Technologies Used:

**Frontend**

- Vite.js
- React
- Material-ui

**Backend Server**

- Nodejs
- Express
- Sequelize
- MySQL

**Crawler**

- python3
- selenium

**Deployment**

- Frontend Deployed in Vercel
- AWS RDS is used for MySQL Database
- AWS s3 is used for image storage
- AWS Lightsail is used for server deployment

### Architecture Overview

Full Architecture

Crawler
![Crawler](documentation/diagrams/crawler.png?raw=true 'Crawler Architecture')

### Api Specifications

We divide the backend apis into different services which serves various purposes.

Private Routes (Only accessible inside the network)

- `GET /requests/uncrawled` -> Gets one uncrawled request
- **Request Service:**

- `POST /requests` -> add a request.
