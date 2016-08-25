FROM node:0.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 8080