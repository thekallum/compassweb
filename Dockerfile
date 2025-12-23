FROM node:20-slim

RUN npm install -g compass-web

WORKDIR /app

COPY . .

EXPOSE 8080

CMD ["node", "start.js"]