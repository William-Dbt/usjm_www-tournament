FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install react-scripts --openssl-legacy-provider

COPY . .

CMD [ "npm", "start" ]