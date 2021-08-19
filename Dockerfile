FROM node:16.4.1-alpine
WORKDIR /usr/chat/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]
