# Use Node.js to build and serve the React app
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Install 'serve' globally to serve the build folder
RUN npm install -g serve

# Expose the default port used by 'serve'
EXPOSE 3000

# Run the app using 'serve'
CMD ["serve", "-s", "build", "-l", "3000"]
