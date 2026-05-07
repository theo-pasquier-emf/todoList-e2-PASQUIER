FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p logs && chown -R node:node /app
USER node

ENV PORT=3000
EXPOSE 3000

CMD ["node", "./server.js"]