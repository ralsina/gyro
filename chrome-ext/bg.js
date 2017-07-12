chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.create({ 'url': chrome.extension.getURL('index.html') }, function (tab) {
	});
});

chrome.webRequest.onCompleted.addListener(function (e) {
	if (!e.statusCode || (e.statusCode !== 404)) {
		return;
	}
	split = e.url.split('/gyro/')
	chrome.tabs.create({ 'url': chrome.extension.getURL('index.html') + '?q=' + encodeURIComponent(split[split.length - 1]) }, function (tab) {
	});
}, {
		urls: ['http://ralsina.me/gyro/*'],
	}, ['responseHeaders']);

