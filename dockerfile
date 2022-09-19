#uses docker multistage builds
# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage (serving static files)
# FROM nginx:stable-alpine as production-stage
FROM nginx as production-stage
# COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

#TODO: declare API URL, and any ENV variables

#To run this container:
# docker build -t frontend:vue .
# docker run -p 80:80 --name frontend frontend:vue
