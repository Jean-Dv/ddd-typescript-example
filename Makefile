.PHONY = default deps build test start-mooc-backend clean start-database start-backoffice-frontend

# Shell to use for running scripts
SHELL := $(shell which bash)
IMAGE_NAME := codelytv/typescript-ddd-skeleton
SERVICE_NAME := app
MOOC_APP_NAME := mooc
BACKOFFICE_APP_NAME := backoffice

# Test if the dependencies we need to run this makefile are installed
DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)
deps:
ifndef DOCKER
	@echo "docker is not available please install it"
	@exit 1
endif
ifndef
	@echo "docker-compose is not available please install it"
	@exit 1
endif

default: build

# build image
build:
	@echo "Building image..."
	@docker build -t $(IMAGE_NAME):dev .