all: test

test: lint-test build-test test-app

build-test:
	npm run -s build:test

lint-test:
	npm run -s lint:test

test-app:
	npm test -s
