FROM node:16.13.2-alpine as build



WORKDIR /server

COPY . /server


RUN yarn config set unsafe-perm true -g --allow-root

RUN yarn


RUN yarn build

EXPOSE 8080

CMD yarn start:prod