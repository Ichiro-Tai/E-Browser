browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
	if (changeInfo.status === 'complete') {
		browser.pageAction.setIcon({
			tabId: tabId, path: 'tears.png'
		});
		browser.pageAction.show(tabId);
	} else {
		browser.pageAction.hide(tabId);
	}
});
