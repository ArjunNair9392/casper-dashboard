# Use the official Node.js image as a base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on (8080)
EXPOSE 8080

# Start the Next.js application on port 8080
CMD ["npm", "start"]