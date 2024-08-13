// cypress.config.js
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    setupNodeEvents(on,config) {
      return config;
    },
    env: {
      URL: 'http://clientapp.narola.online:1180/login'
    }
  },
});
