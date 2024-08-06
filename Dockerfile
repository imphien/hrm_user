FROM node:21.6.2 as build-stage
WORKDIR /app

COPY package* ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.25.4 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 2000

CMD ["nginx", "-g", "daemon off;"]

