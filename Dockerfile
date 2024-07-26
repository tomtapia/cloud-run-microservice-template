# Use the official lightweight Node.js image.
# https://hub.docker.com/_/node
FROM node:21-slim AS builder

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
RUN npm ci --only=production

# Copy local code to the container image.
COPY . ./

# Run a build task.
RUN npm run build


FROM node:21-slim

WORKDIR /app

COPY --from=builder /app ./

# Run the web service on container startup.
ENTRYPOINT ["npm", "run", "start:prod"]