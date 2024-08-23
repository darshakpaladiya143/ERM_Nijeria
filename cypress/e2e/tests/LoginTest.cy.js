import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboradPage'

describe('Login Test Cases on ERM Project', () => {
    const validEmail = 'johndoe@yopmail.com'
    const validPassword = 'Password123!'
    const invalidEmail = 'johndoe123@yopmail.com'
    const invalidPassword = 'Password1234!'

    const loginPage = new LoginPage()
    const dashboardPage = new DashboardPage()

    beforeEach(() => {
        loginPage.visit()
    })

    it('Verify login with valid credentials', () => {
        loginPage.enterEmail(validEmail)
        loginPage.enterPassword(validPassword)
        loginPage.clickLoginButton()
        dashboardPage.assertDashboard()
    })

    it('Verify login page elements', () => {
        const selectors = [".btn", "a"]

        selectors.forEach(selector => {
            cy.get(selector).should('exist')
        })
    })

    it('Verify login with "Remember Me" option & Logout', () => {
        loginPage.enterEmail(validEmail)
        loginPage.enterPassword(validPassword)
        loginPage.clickRememberMe()
        loginPage.clickLoginButton()
        dashboardPage.assertDashboard()
        dashboardPage.logout()
        
        cy.get('#email').should('exist').and('have.value', validEmail)
        cy.get('#formGroupExampleInput2').should('exist').and('have.value', validPassword)
    })

    it('Verify login with invalid username', () => {
        loginPage.enterEmail(invalidEmail)
        loginPage.enterPassword(validPassword)
        loginPage.clickLoginButton()
        loginPage.assertValidationPopup('Username is invalid')
    })

    it('Verify login with invalid password', () => {
        loginPage.enterEmail(validEmail)
        loginPage.enterPassword(invalidPassword)
        loginPage.clickLoginButton()
        loginPage.assertValidationPopup('Password is invalid')
    })

    it('Verify login with empty username', () => {
        loginPage.enterEmail(null)
        loginPage.enterPassword(invalidPassword)
        loginPage.clickLoginButton()
        cy.get('.text-danger').should('be.visible').and('contain.text', 'Email is required')
    })

    it('Verify login with empty password', () => {
        loginPage.enterEmail(validEmail)
        loginPage.enterPassword(null)
        loginPage.clickLoginButton()
        cy.get('.text-danger').should('be.visible').and('contain.text', 'Password is required')
    })

    it('Verify login with empty username and password', () => {
        loginPage.enterEmail(null)
        loginPage.enterPassword(null)
        loginPage.clickLoginButton()
        cy.get('.text-danger').should('be.visible')
            .and('contain.text', 'Email is required')
            .and('contain.text', 'Password is required')
    })

    it('Verify forgot password functionality via email', () => {
        cy.get('a').click()
        loginPage.enterEmail(validEmail)
        cy.get('.btn').click()
        loginPage.assertValidationPopup('Email send!!')
    })
})
