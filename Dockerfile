FROM tiangolo/node-frontend:latest as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install --only=production

COPY ./ /app/

RUN npm run build

FROM nginx:latest

COPY --from=build-stage /app/dist/  /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
