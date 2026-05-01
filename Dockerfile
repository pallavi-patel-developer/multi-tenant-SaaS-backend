FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose port (default 5001 based on your env)
EXPOSE 5001

# Start the application
CMD ["npm", "start"]