###################
# BUILD FOR PRODUCTION
###################
FROM node:22-alpine AS builder

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
RUN npm i -g @nestjs/cli
RUN npm ci

# Copy local code to the container image.
COPY . ./

# Run a build task.
ENV NODE_ENV production
RUN npm run build

###################
# PRODUCTION
###################
FROM node:22-slim

WORKDIR /app

COPY --from=builder /app ./

# Run the web service on container startup.
ENV NODE_ENV production
ENTRYPOINT ["npm", "run", "start:prod"]