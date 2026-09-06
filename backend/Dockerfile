# Tier 2 - Backend API Dockerfile
FROM node:20-alpine

WORKDIR /app

# Pehle sirf package.json copy karo - Docker layer caching ka fayda milta hai
COPY package.json .
RUN npm install --omit=dev

# Ab poora code copy karo
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
