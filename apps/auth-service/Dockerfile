FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build --workspace=apps/auth-service

FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --omit=dev

EXPOSE 4001

CMD ["npm", "run", "start", "--workspace=apps/auth-service"]