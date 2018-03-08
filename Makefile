.PHONY: test

install:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm install"

lint:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s lint"

test:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s test"

compile:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s build"

build:
	@docker build -t local/mow-it .