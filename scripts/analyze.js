chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  const pgnTextarea = document.querySelector("[name='pgn']");
  const analyzeToggle = document.querySelector("[name='analyse']");
  const formElement = document.querySelector("form.import");

  if (pgnTextarea && analyzeToggle && formElement && message?.pgn) {
    pgnTextarea.value = message.pgn;
    analyzeToggle.checked = true;
    formElement.submit();
  }

  sendResponse({ status: "success" });
});
