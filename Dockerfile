FROM node:lts-alpine AS builder

ARG BUILDENV

RUN apk add --update

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build:${BUILDENV}

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html

COPY --from=builder /app/dist/portagebay-ecc-platform-ui /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
