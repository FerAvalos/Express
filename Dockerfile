FROM node:16
WORKDIR /usr/src/app

COPY package*.son
RUN npm install

RUN npm ci --only=prod

COPY ..

EXPOSE 3003
CMD ["node", "index.js"]