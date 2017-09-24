browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
	if (changeInfo.status === 'complete') {
		browser.tabs.executeScript(tabId, {
			code: 'document.body.innerText'
		})
			.then((text) => browser.runtime.sendNativeMessage('rating', text))
			.then((uri) => {
				browser.pageAction.setIcon({tabId: tabId, path: uri});
				browser.pageAction.getPopup({tabId: tabId}, (oldpopup) => {
					var popup = URL.createObjectURL(new Blob(['abcdefg'], {type: 'text/html'}));
					browser.pageAction.setPopup({tabId: tabId, popup: popup});
					if (oldpopup)
						URL.revokeObjectURL(oldpopup);
				});
				browser.pageAction.show(tabId);
			})
			.catch((error) => console.log('Error: ' + error)); // eslint-disable-line no-console
	} else {
		browser.pageAction.hide(tabId);
	}
});
