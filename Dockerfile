FROM node:latest

ADD ./build /app

COPY ./package-lock.json /app
COPY ./package.json /app

WORKDIR /app
EXPOSE 3000

RUN npm ci --omit dev

ENTRYPOINT ["node", "index.js"]
