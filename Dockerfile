# Dockerfile

# base image
FROM node:20.18-alpine

# set working directory
WORKDIR /usr/src

# set timezone
ENV TZ=America/Sao_Paulo

# install global dependencies
RUN yarn add @nestjs/cli

# copy files to docker directory
COPY . .

# install application dependencies
RUN yarn install

# build application
RUN yarn build

EXPOSE 3000

# run application
CMD ["node", "dist/main"]
