describe('Login Test Cases on ERM Project', () => {
  const validEmail = 'johndoe@yopmail.com'
  const validPassword = 'Password123!'
  const invalidEmail = 'johndoe123@yopmail.com'
  const invalidPassword = 'Password1234!'

  beforeEach(() => {
    cy.visit('http://clientapp.narola.online:1180/login')
  })

  it('Verify login with valid credentials', () => {
    cy.login(validEmail, validPassword)
    cy.assertDashboard()
  })

  it('Verify login page elements', () => {
    const selectors = [".btn", "a"]

    selectors.forEach(selector => {
      cy.get(selector).should('exist')
    })
  })

  it('Verify login with "Remember Me" option & Logout', () => {
    // Passing true to check Remember Me
    cy.login(validEmail, validPassword, true) 
    cy.assertDashboard()

    // Log out
    cy.logout()

    // Assert that the email input exists and contains the correct value
    cy.get('#email').should('exist').and('have.value', validEmail)
    cy.get('#formGroupExampleInput2').should('exist').and('have.value', validPassword)
  })

  it('Verify login with invalid username', () => {
    cy.login(invalidEmail, validPassword)
    cy.assertValidationPopup('Username is invalid')
  })

  it('Verify login with invalid password', () => {
    cy.login(validEmail, invalidPassword)
    cy.assertValidationPopup('Password is invalid')
  })

  it('Verify login with empty username', () => {
    cy.get('#email').clear()
    cy.get('#formGroupExampleInput2').type(invalidPassword)
    cy.get('.btn').click()
    cy.get('.text-danger')
      .should('be.visible')
      .and('contain.text', 'Email is required')
  })

  it('Verify login with empty password', () => {
    cy.get('#email').type(validEmail)
    cy.get('#formGroupExampleInput2').clear()
    cy.get('.btn').click()
    cy.get('.text-danger')
      .should('be.visible')
      .and('contain.text', 'Password is required')
  })

  it('Verify login with empty username and password', () => {
    cy.get('#email').clear()
    cy.get('#formGroupExampleInput2').clear()
    cy.get('.btn').click()
    cy.get('.text-danger')
      .should('be.visible')
      .and('contain.text', 'Email is required')
      .and('contain.text', 'Password is required')
  })

  it('Verify forgot password functionality via email', () => {
    cy.get('a').click()
    cy.get('#email').type(validEmail)
    cy.get('.btn').click()
    cy.assertValidationPopup('Email send!!')
  })
})
