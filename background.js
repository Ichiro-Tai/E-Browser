browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
	if (changeInfo.status === 'complete') {
		browser.tabs.executeScript(tabId, {
			code: 'document.body.innerText'
		})
			.then((text) => browser.runtime.sendNativeMessage('rating', text))
			.catch((error) => console.log('Error B: ' + error)) // eslint-disable-line no-console
			.then((uri) => {
				console.log(uri);
				browser.pageAction.setIcon({
					tabId: tabId, path: uri
				});
				browser.pageAction.show(tabId);
			})
			.catch((error) => console.log('Error A: ' + error)); // eslint-disable-line no-console
			// .catch((error) => browser.tabs.executeScript(tabId, {code: error}));
	} else {
		browser.pageAction.hide(tabId);
	}
});
