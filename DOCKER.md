# Docker Setup for Production

This document explains how to build and run the Gemstone Front application in a production environment using Docker and Nginx.

## Prerequisites

- Docker installed on your system
- Access to the repository

## Building the Docker Image

To build the Docker image, run the following command from the project root directory:

```bash
docker build -t gemstone-front:production .
```

This will create a Docker image named `gemstone-front` with the tag `production`.

## Running the Docker Container

To run the Docker container, use the following command:

```bash
docker run -d -p 80:80 --name gemstone-front gemstone-front:production
```

This will:
- Run the container in detached mode (`-d`)
- Map port 80 of the host to port 80 of the container (`-p 80:80`)
- Name the container `gemstone-front`

The application will be accessible at `http://localhost` (or your server's IP/domain).

## Environment Variables

The production build uses the environment variables defined in `.env.production`. If you need to modify these variables, update the file before building the Docker image.

## Nginx Configuration

The Nginx configuration is defined in `nginx.conf` and includes:

- Gzip compression for better performance
- Cache settings for static assets
- SPA routing configuration (redirects all requests to index.html)
- Security headers

## Updating the Application

To update the application:

1. Pull the latest code from the repository
2. Rebuild the Docker image
3. Stop and remove the old container
4. Run a new container with the updated image

```bash
# Pull latest code
git pull

# Rebuild the image
docker build -t gemstone-front:production .

# Stop and remove the old container
docker stop gemstone-front
docker rm gemstone-front

# Run a new container
docker run -d -p 80:80 --name gemstone-front gemstone-front:production
```

## Using with Docker Compose

If you're using Docker Compose for orchestration, you can add the following service to your `docker-compose.yml`:

```yaml
services:
  frontend:
    build:
      context: ./gemstone-front
      dockerfile: Dockerfile
    ports:
      - "80:80"
    restart: unless-stopped
```

Then run:

```bash
docker-compose up -d
```