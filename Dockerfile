FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /code

COPY package.json .
COPY pnpm-*.yaml .
RUN pnpm install