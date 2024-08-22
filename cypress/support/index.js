Cypress.on('uncaught:exception', (err, runnable) => {
    // Check for the specific error message
    if (err.message.includes('ResizeObserver loop completed with undelivered notification')) {
      // Prevent the error from failing the test
      return false;
    }
    // Let other errors fail the test
    return true;
  });
  