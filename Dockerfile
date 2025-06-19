# -------- Step 1: Build React App --------
FROM node:18-alpine AS build

WORKDIR /app

# ✅ Only copy dependency files first to leverage Docker cache
COPY package.json package-lock.json ./

# ✅ Install only production dependencies, faster & reproducible
RUN npm ci

# ✅ Copy rest of the source files only after dependencies
COPY . .

# Build the production React app
RUN npm run build

# -------- Step 2: Serve with Nginx --------
FROM nginx:stable-alpine

# Copy build output to Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Use custom nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose default HTTP port
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
