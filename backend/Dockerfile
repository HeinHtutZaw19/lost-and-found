# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from the root directory
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the backend source code into the backend folder inside the container
COPY ./backend /app/backend

# Expose the backend port
EXPOSE 3000

# Start the backend application
CMD ["npm", "start"]
