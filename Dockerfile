FROM node:16.4.2-alpine
WORKDIR /usr/chat/server
COPY package*.json ./
RUN npm install
RUN npm install typescript -g
COPY . .
RUN tsc
EXPOSE 8080
CMD [ "npm", "run", "docker" ]
