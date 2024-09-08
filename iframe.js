/* ACTIONS */

export function waitForIframe(iframeId = "ptifrmtgtframe") {
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

export function waitForDynamicIframe(iframePartialId) {
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

/* GETTERS */

export function getValueFromIframe(iframeId = "ptifrmtgtframe", elementId) {
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

/* SETTERS */

export function clickButtonInIframe(iframeId, buttonId) {
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

export function fillOutInIframe(iframeId, inputId, value) {
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
