# Stage 1

FROM node:16-alpine as build-step

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install --save --legacy-peer-deps

COPY . .

EXPOSE 4200

CMD ["npm", "start"]




