// Define the number of retries and interval between each check
const maxRetries = 20;
let retries = 0;
let retries2 = 0;

let notDone = true;
// Function to check for the required elements
function checkElements() {
  console.log("check");

  if (document?.querySelector('div[data-testid="primaryColumn"]')?.scrollHeight > 1000) {
    console.log("done");
    notDone = false;
    setTimeout(runActions1, 500);
  } else if (retries < maxRetries && notDone) {
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
      retries2++;
      setTimeout(runActions1, 500);
    }
  }

  // Start the checking process
}
if (window.location.href.toLowerCase().includes("status")) {
  checkElements();
}
