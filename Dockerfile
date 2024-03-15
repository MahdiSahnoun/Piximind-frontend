# Use official Node.js image as base
FROM node:14-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
