FROM node:carbon-alpine
WORKDIR /usr/local/app
COPY . .
RUN npm install --production
EXPOSE 3000
ENTRYPOINT [ "npm", "start", "-s"]
