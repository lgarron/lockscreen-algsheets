.PHONY: dev
dev:
	npx vite

.PHONY: screenshots
screenshots:
	node ./screenshots.js
