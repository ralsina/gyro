all: electron sanic chromeext

electron:
	jinja2 templates/index.j2 data/electron.yaml   > electron/index.html
	ln -sf ../_static electron/static

electron-build:
	npm install electron@1.6.11 --keep-dev
	electron-packager electron gyro --electron-version=1.6.11 --overwrite

sanic:
	jinja2 templates/index.j2 data/sanic.yaml   > sanic/index.html

chromeext:
	jinja2 templates/index.j2 data/chromeext.yaml   > chromeext/index.html
	ln -sf ../_static chromeext/static

.PHONY: sanic electron chromeext
