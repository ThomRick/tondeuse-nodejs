.PHONY: test

prepare:
	npm install

build:
	npm run -s build

test:
	npm test -s

start:
	npm start -s
