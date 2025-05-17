# Use Node.js to build and serve the React app
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Install 'serve' globally
RUN npm install -g serve

# Expose port that 'serve' will use
EXPOSE 3000

# Start the static file server
CMD ["serve", "-s", "build", "-l", "3000"]
