FROM node:carbon-alpine as builder
WORKDIR /usr/local/app
COPY . .
RUN apk add -U bash make
RUN make prepare && \
    make build && \
    rm -rf src Makefile tsconfig.json

FROM node:carbon-alpine
WORKDIR /usr/local/app
COPY --from=builder /usr/local/app .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
