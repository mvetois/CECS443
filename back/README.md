# CECS 443 - Project Backend

This is the backend for the CECS 443 project.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Software Requirements

To start the project, you will need to install the following software:
- [NodeJS](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

## Installation of the dependencies

To install the dependencies, run the following command:

```bash
$> npm install
```

## Starting the backend

You must begin the startup of the backend by running the docker component, which will start the database:

```bash
$> docker-compose up -d
```

When the database is running, you can build and start the backend:

```bash
# Build the backend
$> npm run build

# Start the backend
$> npm start
```

## Testing the backend

For testing the backend, you can run the following command:

```bash
# Build the backend
$> npm run build

# Run the integration tests
$> npm run test:ci
```

## Useful links

- API [http://localhost:5000/api](http://localhost:5000/)
- Documentation [http://localhost:5000/doc](http://localhost:5000/doc)
- Database viewer [http://localhost:5001](http://localhost:5001)

# Project Members
- [Matthieu VETOIS](https://github.com/mvetois)
