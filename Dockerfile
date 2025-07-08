# Step 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install 

# Copy app source and build it
COPY . .
RUN npm run build

# Step 2: Serve the built app using Nginx
FROM nginx:1.28.0-alpine3.21-slim

# Copy the build output to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Use custom Nginx configuration (replaces default one)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
