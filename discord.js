/* DISCORD SETUP AND MESSAGES */

/**
 * Sets up the Discord webhook URL.
 * @param {string} url - The Discord webhook URL.
 * @returns {object} An object containing functions for sending messages to Discord.
 */
function discordSetup(url) {
  const webhookUrl = url;

  /**
   * Sends a message to the configured Discord webhook.
   * @param {string} message - The message content to send to Discord.
   */
  function sendMessage(message) {
    fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    });
  }

  /**
   * Sends a success message to the configured Discord webhook.
   * @param {string} message - The success message to send.
   */
  function sendSuccessMessage(message) {
    sendMessage(`:white_check_mark: ${message}`);
  }

  /**
   * Sends an error message to the configured Discord webhook.
   * @param {string} message - The error message to send.
   */
  function sendErrorMessage(message) {
    sendMessage(`:x: ${message}`);
  }

  /**
   * Formats a message in code block format for Discord.
   * @param {string} message - The message to format.
   * @returns {string} The formatted message in code block format.
   */
  function getCodeMessage(message) {
    return `\`\`\`\n${message}\`\`\``;
  }

  /**
   * Formats a message in markdown format for Discord.
   * @param {string} message - The message to format.
   * @returns {string} The formatted message in markdown format.
   */
  function getMarkdownMessage(message) {
    return `\`\`\`md\n${message}\`\`\``;
  }

  // Return an object with methods for sending messages to Discord and formatting them
  return {
    sendMessage,
    sendSuccessMessage,
    sendErrorMessage,
    getCodeMessage,
    getMarkdownMessage,
  };
}
