chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ searchTerms: ["", "", "", ""] }, () => {
    console.log("The search terms have been initialized.");
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "clearData") {
    const targetOrigin = "https://dokokani-eki-net.com/*";
    chrome.browsingData.remove( // doesn't work
      { origins: [targetOrigin] },
      {
        "cookies": true,
        "cache": false,
        "localStorage": false,
        "cacheStorage": false,
        "indexedDB": false,
        "serviceWorkers": false,
        "webSQL": false
      },
      () => {
        console.log("Data cleared for origin:", targetOrigin);
      }
    );
  }
});
