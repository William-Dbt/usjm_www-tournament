FROM node:21

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY package*.json package-lock.json ./

RUN npm install

COPY . .

RUN chmod 777 script_init.sh

CMD [ "./script_init.sh" ]