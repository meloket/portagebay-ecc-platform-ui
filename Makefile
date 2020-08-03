NS      ?= default
VERSION ?= $(shell git rev-parse HEAD)
APP     ?= portagebay-ecc-platform-ui
REPO    ?= gcr.io/edmonds-community-college/$(APP)
IMAGE   ?= $(REPO):$(VERSION)
PORT    ?= 80
CLUSTER ?= edmonds-cluster
CONTEXT ?= gke_edmonds-community-college_us-west1_edmonds-cluster
REGION  ?= us-west1
FLAG    ?= "--debug"
BASEDIR ?= manifests

.PHONY: build

all:    login build publish install
deploy: login publish install

build:   ; docker build -t $(IMAGE) .
run:     ; docker run -p 81:80 $(IMAGE)
publish: ; docker push $(IMAGE)

changelog:
	@git changelog --all --tag ${VERSION} -p && cp History.md src/assets/

version:
	envsubst < src/environments/environment.ts.tmp > src/environments/environment.ts
	envsubst < src/environments/environment.prod.ts.tmp > src/environments/environment.prod.ts

login:
	@kubectl config use-context $(CONTEXT)
	@gcloud container clusters get-credentials $(CLUSTER) --region $(REGION)

install:
	@helm upgrade --install \
		$(FLAG) \
		$(APP) \
		./$(BASEDIR) \
		--set fullnameOverride=$(APP) \
		--set image.tag=$(VERSION) \
		--set image.repository=$(REPO) \
		--set service.port=$(PORT) \
		--namespace $(NS) \
		--wait \
		--timeout 100