function sendExtractMessage(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

chrome.action.onClicked.addListener(async (tab) => {
  const chessComRegex = /^https:\/\/www\.chess\.com\/.+/;

  if (!chessComRegex.test(tab.url)) {
    return;
  }

  const pgn = await sendExtractMessage(tab.id, { action: "copy pgn" });

  const newTab = await new Promise((resolve) => {
    chrome.tabs.create({ url: "https://lichess.org/paste" }, resolve);
  });

  chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
    if (tabId === newTab.id && info.status === "complete") {
      chrome.tabs.sendMessage(tabId, { pgn });
      chrome.tabs.onUpdated.removeListener(listener);
    }
  });
});
