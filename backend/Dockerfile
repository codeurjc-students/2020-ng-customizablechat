FROM node:16-alpine As development

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run start


