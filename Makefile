.PHONY: test e2e

install:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm install"
	@echo "install done"

lint:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s lint"
	@echo "lint done"

test:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s test"
	@echo "test done"

e2e:
	@docker-compose up -d
	@-npm run -s e2e
	@docker-compose stop
	@echo "e2e done"

compile:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s build"
	@echo "compile done"

build:
	@docker build -t local/mow-it .
	@echo "build done"