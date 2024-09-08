/***********/
/* ACTIONS */
/***********/

/**
 * Waits for an iframe with a specific ID to be present in the DOM and resolves when found.
 * @param {string} [iframeId='ptifrmtgtframe'] - The ID of the iframe to wait for.
 * @returns {Promise<void>} A promise that resolves once the iframe is found.
 */
function waitForIframe(iframeId = "ptifrmtgtframe") {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const iframe = document.getElementById(iframeId);
      if (iframe) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

/**
 * Waits for an iframe with a dynamic ID (that includes a partial string) to be present in the DOM and resolves with the iframe when found.
 * @param {string} iframePartialId - A partial string of the iframe's ID to match.
 * @returns {Promise<HTMLIFrameElement>} A promise that resolves with the found iframe element.
 */
function waitForDynamicIframe(iframePartialId) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const iframes = document.querySelectorAll("iframe");
      let targetIframe = null;
      iframes.forEach((iframe) => {
        if (iframe.id.includes(iframePartialId)) {
          targetIframe = iframe;
        }
      });
      if (targetIframe) {
        clearInterval(interval);
        resolve(targetIframe);
      }
    }, 1000);
  });
}

/***********/
/* GETTERS */
/***********/

/**
 * Retrieves the value or text content of a specific element within an iframe.
 * @param {string} [iframeId='ptifrmtgtframe'] - The ID of the iframe containing the element.
 * @param {string} elementId - The ID of the element within the iframe to retrieve the value from.
 * @returns {Promise<string>} A promise that resolves with the value or text content of the element.
 */
function getValueFromIframe(iframeId = "ptifrmtgtframe", elementId) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const iframe = document.getElementById(iframeId);
      if (iframe) {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document;
        const element = iframeDoc.getElementById(elementId);
        if (element) {
          clearInterval(interval);
          resolve(element.value || element.textContent);
        }
      }
    }, 1000);
  });
}

/***********/
/* SETTERS */
/***********/

/**
 * Clicks a button inside a specific iframe.
 * @param {string} iframeId - The ID of the iframe containing the button.
 * @param {string} buttonId - The ID of the button to click within the iframe.
 * @returns {Promise<void>} A promise that resolves when the button is clicked.
 */
function clickButtonInIframe(iframeId, buttonId) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const iframe = document.getElementById(iframeId);
      if (iframe) {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document;
        const button = iframeDoc.getElementById(buttonId);
        if (button) {
          button.click();
          clearInterval(interval);
          resolve();
        }
      }
    }, 1000);
  });
}

/**
 * Fills out an input field inside a specific iframe and triggers necessary events to simulate real user input.
 * @param {string} iframeId - The ID of the iframe containing the input field.
 * @param {string} inputId - The ID of the input field to fill out.
 * @param {string} value - The value to set in the input field.
 * @returns {Promise<void>} A promise that resolves when the input field is filled out.
 */
function fillOutInIframe(iframeId, inputId, value) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const iframe = document.getElementById(iframeId);
      if (iframe) {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document;
        const input = iframeDoc.getElementById(inputId);
        if (input) {
          // Simulate focus event
          input.focus();

          // Set the value in the input field
          input.value = value;

          // Trigger the 'input' and 'change' events to simulate real user input
          const inputEvent = new Event("input", { bubbles: true });
          const changeEvent = new Event("change", { bubbles: true });
          input.dispatchEvent(inputEvent);
          input.dispatchEvent(changeEvent);

          // Simulate blur event to trigger validation
          input.blur();
          clearInterval(interval);
          resolve();
        }
      }
    }, 1000);
  });
}
