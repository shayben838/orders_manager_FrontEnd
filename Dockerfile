# Use the official Node.js image
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use an Nginx image to serve the build folder
FROM nginx:alpine

# Copy the React build from the previous stage into the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the React app to be accessed
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
