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

const unfocus = async () => {
  if (!document.querySelector("[aria-label='Share']")) {
    return waitAndSelectButton("[aria-label='Focus Mode']", 50);
  }

  return Promise.resolve();
};

const openSharePopup = async () => {
  return waitAndSelectButton("[aria-label='Share']", 500);
};

const selectPgnTab = async () => {
  return waitAndSelectButton(
    ".share-menu-tab-selector-tab span:first-child",
    100
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
  unfocus()
    .then(openSharePopup)
    .then(selectPgnTab)
    .then(copyPgn)
    .then(sendResponse);
  return true;
});
