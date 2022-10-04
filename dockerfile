#uses docker multistage builds
# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage (serving static files)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#TODO: declare API URL, and any ENV variables

#To run this container:
# docker build -t frontend:vue .
# docker run -p 3000:80 --name frontend frontend:vue
#
