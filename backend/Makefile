.SILENT:
.PHONY: install
## install
install:
	pnpm install

.SILENT:
.PHONY: dev
## dev
dev:
	npx vercel dev

.SILENT:
.PHONY: test
## test
test:
	gotest ./api/... -v

.SILENT:
.PHONY: deploy
## deploy
deploy:
	npx vercel --prod

.DEFAULT_GOAL := help
.SILENT:
.PHONY: help
help:
	@echo "$$(tput setaf 2)Available rules:$$(tput sgr0)";sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## /---/;td" -e"s/:.*//;G;s/\\n## /===/;s/\\n//g;p;}" ${MAKEFILE_LIST}|awk -F === -v n=$$(tput cols) -v i=4 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"- %s%s%s\n",a,$$1,z;m=split($$2,w,"---");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;}printf"%*s%s\n",-i," ",w[j];}}'
