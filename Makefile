.PHONY: test e2e

all: install lint test compile build e2e

install:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm install"
	@echo "INSTALL DONE"

lint:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s lint"
	@echo "LINT DONE"

test:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s test"
	@echo "UNIT TESTS DONE"

compile:
	@docker run -t -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s build"
	@echo "COMPILE DONE"

build:
	@docker build -t local/mow-it .
	@echo "BUILD IMAGE DONE"

e2e:
	@docker-compose up -d
	@-docker run -t --net=host -v $$(pwd):/usr/local/app $$(docker build -qf .docker/build/Dockerfile .) /bin/sh -c "npm run -s e2e"
	@docker-compose stop
	@echo "E2E TESTS DONE"
