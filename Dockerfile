FROM nginx

MAINTAINER andyxu

COPY ./storybook-static/* /usr/share/nginx/html/

EXPOSE 80