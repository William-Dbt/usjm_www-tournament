FROM node:21

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY package*.json package-lock.json ./

COPY . .

RUN npm install

RUN chmod 777 script_init.sh

CMD [ "./script_init.sh" ]