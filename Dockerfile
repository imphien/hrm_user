#FROM node:21.6.2 as build-stage
#WORKDIR /app
#
#COPY package* ./
#RUN npm install
#
#COPY . .
#RUN npm run build
#
#FROM nginx:1.25.4 as production-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#COPY --from=build-stage /app/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 2000
#
#CMD ["nginx", "-g", "daemon off;"]

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

