FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 7080

CMD [ "npm", "start" ]
