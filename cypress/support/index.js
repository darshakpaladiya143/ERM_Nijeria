Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore the 'backdrop' error
    if (err.message.includes('backdrop')) {
      return false;
    }
  });
  