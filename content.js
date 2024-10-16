const maxRetries = 20;
let retries = 0;
let retries2 = 0;
let retries3 = 0;
let firstload = true;
let lastUrl = "";

function replayButtonOn() {
  if (document.querySelector('button[aria-label="Reply"]')) {
    return true;
  } else {
    return false;
  }
}
function checkElements() {
  // console.log("checking...");

  if (document?.querySelector('div[data-testid="primaryColumn"]')?.scrollHeight > 1000) {
    setTimeout(runActions1, 500);
  } else if (retries < maxRetries) {
    retries++;
    setTimeout(checkElements, 500);
  }
}

function runActions1() {
  window.scrollTo(0, 1000);
  function scrollup() {
    if (replayButtonOn) {
      window.scrollTo(0, 0);
      setTimeout(runActions2, 100);
    } else {
      setTimeout(scrollup, 1);
    }
  }

  if (retries3 < maxRetries) {
    retries3++;
    setTimeout(scrollup, 1);
  }
}

function runActions2() {
  if (replayButtonOn()) {
    document
      .querySelector('div[aria-label="Home timeline"]')
      .querySelector('button[aria-haspopup="menu"]')
      .click();
    setTimeout(function () {
      Array.from(document.querySelectorAll("span"))
        .find((span) => span.textContent.trim() === "Likes")
        .click();
    }, 100);
  } else {
    if (retries2 < maxRetries) {
      retries2++;
      setTimeout(runActions2, 100);
    }
  }
}

function isStatusPage() {
  return location.href.toLowerCase().includes("status");
}

function onUrlChange() {
  if (isStatusPage() && !replayButtonOn()) {
    retries = 0;
    retries2 = 0;
    retries3 = 0;

    checkElements();
  }
}

if (firstload) {
  // console.log(1);
  firstload = false;
  lastUrl = location.href;
}
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, { subtree: true, childList: true });

// Initial run
onUrlChange();
