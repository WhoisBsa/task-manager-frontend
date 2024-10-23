#-------------------------------------------
FROM node:20.13.1-bullseye AS build
#-------------------------------------------
WORKDIR /usr/src/app
COPY package*.json ./
#-------------------------------------------
RUN npm install -g @angular/cli
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci
COPY . .
RUN npm run build --prod
#-------------------------------------------
FROM nginxinc/nginx-unprivileged:1.23-alpine-perl
COPY --link nginx.conf /etc/nginx/conf.d/default.conf
COPY --link --from=build usr/src/app/dist/frontend /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
