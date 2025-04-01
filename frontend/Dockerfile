# Use Node.js as the base image
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json .

# Copy the rest of the project files
COPY . .

# Install dependencies
RUN npm install
RUN npm install @chakra-ui/react@2 @chakra-ui/icons 

# Build the project
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine AS production

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
