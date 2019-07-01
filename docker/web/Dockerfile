FROM node:9.3.0-alpine

WORKDIR /usr/src/mplus

ADD /package.json /package-lock.json ./

RUN apk update && \
    apk upgrade && \
    apk add g++ gcc python && \
    ls -ls && \
    npm install

CMD npm run watch
