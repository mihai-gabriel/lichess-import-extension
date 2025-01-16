const waitAndSelectButton = async (selector, timeout) => {
  const pressedElement = document.querySelector(selector);

  return new Promise((resolve, reject) => {
    if (pressedElement) {
      pressedElement.click();
      setTimeout(() => {
        resolve(pressedElement.value);
      }, timeout);
    } else {
      reject();
    }
  });
};

const openSharePopup = async () => {
  return waitAndSelectButton("[aria-label='Share']", 1200);
};

const selectPgnTab = async () => {
  return waitAndSelectButton(
    ".share-menu-tab-selector-tab span:first-child",
    300
  );
};

const copyPgn = async () => {
  return waitAndSelectButton("[name='pgn']");
};

chrome.runtime.onMessage.addListener(function (
  _request,
  _sender,
  sendResponse
) {
  openSharePopup().then(selectPgnTab).then(copyPgn).then(sendResponse);
  return true;
});
