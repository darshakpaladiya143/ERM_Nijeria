class LoginPage {
  visit() {
      cy.visit('http://clientapp.narola.online:1180/login')
  }

  enterEmail(email) {
      if (email) {
          cy.get('#email').clear().type(email)
      } else {
          cy.get('#email').clear()
      }
  }

  enterPassword(password) {
      if (password) {
          cy.get('#formGroupExampleInput2').clear().type(password)
      } else {
          cy.get('#formGroupExampleInput2').clear()
      }
  }

  clickRememberMe() {
      cy.get('#rememberMe').should('be.visible').click()
  }

  clickLoginButton() {
      cy.get('.btn').click()
      cy.wait(5000)
  }

  assertValidationPopup(expectedText) {
      cy.get('.swal2-popup', { timeout: 10000 }).should('be.visible')
      cy.get('.swal2-popup .swal2-html-container').should('have.text', expectedText)
      cy.get('.swal2-confirm').click()
  }
}

export default LoginPage;
