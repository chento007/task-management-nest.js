FROM node:16.10.0-alpine

WORKDIR /app
ENV NODE_ENV development
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "pnpm", "start:dev" ]
