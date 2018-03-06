FROM node:carbon-alpine
WORKDIR /usr/local/app
COPY . .
RUN npm install --production
RUN ls
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
