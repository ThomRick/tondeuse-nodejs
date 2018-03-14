FROM node:carbon-alpine
WORKDIR /usr/local/app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY . .
RUN npm install --production
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
