all: electron sanic chromeext remove-extra

remove-extra:
	rm -f _static/_static

electron:
	jinja2 templates/index.j2 data/electron.yaml   > electron/index.html
	ln -sf ../_static electron/static

electron-build: electron
	rm -f _static/_static
	npm install electron@1.7.4 --keep-dev
	electron-packager electron gyro --electron-version=1.7.4 --overwrite

snap: electron-build
	cp snap/wrapper gyro-linux-x64/
	snapcraft clean gyro -s pull
	snapcraft

sanic: remove-extra
	jinja2 templates/index.j2 data/sanic.yaml   > sanic/index.html

chromeext:
	jinja2 templates/index.j2 data/chromeext.yaml   > chromeext/index.html
	ln -sf ../_static chromeext/static

.PHONY: sanic electron chromeext remove-extra
