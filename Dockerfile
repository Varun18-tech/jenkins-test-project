FROM node:18-alpine

WORKDIR /app
COPY package*.json ./

# Install ALL dependencies, including devDependencies for testing
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
