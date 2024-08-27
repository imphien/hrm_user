FROM node:21.6.2 as builder
WORKDIR /app

COPY package* ./
COPY yarn.lock ./

RUN yarn install

COPY . .
RUN yarn build

FROM nginx:1.25.4-alpine

WORKDIR /var/www/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder --chown=nginx app/dist /var/www/html/
EXPOSE 2000

CMD ["nginx", "-g", "daemon off;"]

