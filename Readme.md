### Web Automation Project

In this application we Scrap data from various data sources. [ Mostly healthcare facility websites in the US ] and Store those data into a database. We provide a searchable interface where users can search for facilities based on the state, city or even the facility name.

If queried listing is not found, user can make a request and the system will fetch the given info.

Users can also view the different facility details. They can upload images of these facilities so that other users can be benefitted.

##### Table of Contents

- [Application](#application)
- [Technologies Used:](#technologies-used)
    - [Frontend](#frontend)
    - [Backend Server](#backend-server)
    - [Crawler](#crawler)
    - [Deployment](#deployment)
- [Architecture Overview](#architecture-overview)
- [Api Specifications](#api-specifications)
    - [Routes](#routes)
    - [Api Design Considerations](#api-design-considerations)
- [Deployment](#deployment-1)
      - [SSL Configuration:](#ssl-configuration)
      - [Database Configuration:](#database-configuration)

## Application

Live Demo: [Link](https://react-mui-search.vercel.app/)

![Website](documentation/diagrams/web-page-1.png?raw=true 'Website')

## Technologies Used:

#### Frontend

- Vite.js
- React
- Material-ui

#### Backend Server

- Nodejs
- Express
- Sequelize
- MySQL

#### Crawler

- python3
- selenium

#### Deployment

- Frontend Deployed in Vercel
- AWS RDS is used for MySQL Database
- AWS s3 is used for image storage
- AWS Lightsail is used for server deployment

## Architecture Overview

Full Architecture

![Crawler](documentation/diagrams/backend-architecture.png?raw=true 'Crawler Architecture')

## Api Specifications

We divide the backend apis into different services which serves various purposes. Here are the services that are used by the frontend

#### Routes

**Cities:**
We use a third party api `POST https://countriesnow.space/api/v0.1/countries/state/cities` - This returns the list of citie in a given state.

**Requests:**

- `POST /v1/requests` - adds a request to the db for scraping.

**Listings**

- `GET /v1/listings` - get all listings
- `GET /v1/listings` - get all listings
- `POST /v1/listings/search` - returns the partial name, state or cities which match with the user input

Private Routes (Only accessible inside the network/VPC)

- `GET /private/requests/uncrawled` - Gets one uncrawled request

#### Api Design Considerations

- **Versioning:** We maintain a versioning system for our apis initially so that when a breaking change is introduced in production the application does not break.

- **Private Routes:** We have introduced a proxy which ensure that our application can only be acessed from outside the instance through two ports `80` and `443` the proxy also does automatic redirects from `http` to `https`. Thus, other services such as the crawler can access private routes without any need for authentication and write securely to the db.

## Deployment

We use docker for deploying the whole application since docker makes it very easy to manage dependencies between local and prod environments. The entire application is hosted in a single Lightsail instance.

##### SSL Configuration:

SSL was configured using `certbot`. Further details provided [here](/documentation/ssl-config.md)

##### Database Configuration:

We are using MySQL database for this project.

- Hosted in AWS RDS (Free Tier)
- For development, we use a local environment

More details [here](/documentation/database-config.md)
