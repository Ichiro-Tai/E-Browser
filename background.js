var html_first = '<!DCCTYPE html><html><body><div style="border-style:solid;margin:10px;padding:10px;"><h1>The page\'s feeling</h1><img style="display:block;margin-left:auto;margin-right:auto;" src="';
var html_last = '" alt="tears" width="50" height="50"/></div></body></html>';

browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
	if (changeInfo.status === 'complete') {
		browser.tabs.executeScript(tabId, {
			code: 'document.body.innerText'
		})
			.then((text) => browser.runtime.sendNativeMessage('rating', text))
			.then((uri) => {
				browser.pageAction.setIcon({tabId: tabId, path: uri});
				browser.pageAction.getPopup({tabId: tabId}, (oldpopup) => {
					var popup = URL.createObjectURL(
						new Blob([html_first + browser.extension.getURL(uri) + html_last],
							{type: 'text/html'}
						));
					browser.pageAction.setPopup({tabId: tabId, popup: popup});
					if (oldpopup)
						URL.revokeObjectURL(oldpopup);
				});
				browser.pageAction.show(tabId);
			})
			.catch((error) => console.log(error)); // eslint-disable-line no-console
	} else {
		browser.pageAction.hide(tabId);
	}
});

browser.tabs.onRemoved.addListener((tabId, removeInfo, tabInfo) => {
	browser.pageAction.getPopup({tabId: tabId}, (oldpopup) => {
		if (oldpopup)
			URL.revokeObjectURL(oldpopup);
	});
});
