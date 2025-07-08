const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    supportFile: false, // ✅ disables support file requirement
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 30000,

    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});
