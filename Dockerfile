FROM node:alpine as builder
WORKDIR /usr/src/app
ARG REACT_APP_API_PATH
ENV NODE_ENV=production
ENV NODE_PATH=$NODE_PATH
RUN npm config set unsafe-perm true
RUN npm install npm@6 --global --quiet
RUN npm set unsafe-perm true
RUN mkdir -p /usr/src/app/target
COPY . .
RUN npm ci
RUN npm run build
RUN mv build /usr/src/app/target/

FROM nginx:stable-alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/target/build /usr/share/nginx/html
RUN chown nginx.nginx /usr/share/nginx/html/ -R
CMD ["nginx", "-g", "daemon off;"]
