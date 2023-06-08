FROM node:18.16.0

USER root

RUN apt update

ENV PORT=3001

EXPOSE 3001

WORKDIR /app

COPY package.json /app/package.json

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]