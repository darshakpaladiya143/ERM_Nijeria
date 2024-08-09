class DashboardPage {
    assertDashboard() {
      cy.get(':nth-child(1) > .page-title').should('be.visible')
        .invoke('text').then((text) => {
          expect(text.trim()).to.equal('Dashboard')
        })
    }
  
    logout() {
      cy.get('.user-dropdown').click()
      cy.get(':nth-child(4) > .dropdown-item').click()
      cy.get('a').contains('LOG IN').should('be.visible').click()
    }
  }
  
  export default DashboardPage;
  