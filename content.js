// Define the number of retries and interval between each check
const maxRetries = 20;
let retries = 0;
let retries2 = 0;
let firstload = true;
let lastUrl = "";
// Function to check for the required elements
function checkElements() {
  console.log("checking...");

  if (document?.querySelector('div[data-testid="primaryColumn"]')?.scrollHeight > 1000) {
    setTimeout(runActions1, 500);
  } else if (retries < maxRetries) {
    retries++;
    setTimeout(checkElements, 500); // Retry every 0.5 seconds
  }
}

// Function to perform the scroll and click actions
function runActions1() {
  window.scrollTo(0, 1000);

  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 1);
  setTimeout(runActions2, 100);
}

function runActions2() {
  if (document.querySelector('button[aria-label="Reply"]')) {
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
      retries++;
      setTimeout(runActions2, 500);
    }
  }
}

// Function to check if the current URL is a status page
function isStatusPage() {
  return location.href.toLowerCase().includes("status");
}

// Function to run when URL changes
function onUrlChange() {
  if (isStatusPage()) {
    checkElements();
  }
}

// Listen for URL changes
if (firstload) {
  console.log(1);
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
