FROM nginx:1.17.0-alpine

RUN rm /etc/nginx/conf.d/default.conf


COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]