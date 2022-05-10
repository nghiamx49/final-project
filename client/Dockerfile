FROM node:16.13.2-alpine as build


WORKDIR /client

COPY . /client

RUN yarn

RUN yarn build

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]
