# Use Node.js Alpine
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy application code
COPY frontend/ ./

# Expose port for Vite
EXPOSE 3000

# Run development server
CMD ["npm", "run", "dev", "--", "--host"]