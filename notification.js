/**
 * Shows a notification in the browser if the Notification API is supported.
 * Requests permission to show notifications if not already granted.
 * @param {string} title - The title of the notification.
 * @param {string} message - The message body of the notification.
 */
function showNotification(title, message) {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      const notification = new Notification(title, {
        body: message,
        icon: "https://example.com/icon.png", // Update the icon URL as needed
      });

      notification.onclick = function () {
        window.open("https://example.com"); // Update the URL as needed
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          const notification = new Notification(title, {
            body: message,
            icon: "https://example.com/icon.png", // Update the icon URL as needed
          });

          notification.onclick = function () {
            window.open("https://example.com"); // Update the URL as needed
          };
        }
      });
    }
  } else {
    console.log("This browser does not support notifications.");
  }
}
