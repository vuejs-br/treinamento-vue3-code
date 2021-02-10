FROM node:13-alpine as build

WORKDIR /

COPY . .

ENV NODE_ENV=production
RUN npm install --production
RUN npm run build

FROM nginx:1.18.0-alpine as final

WORKDIR /
COPY --from=build ./dist /usr/share/nginx/html
