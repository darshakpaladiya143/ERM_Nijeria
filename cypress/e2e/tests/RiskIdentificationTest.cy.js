import RiskIdentificationPage from '../pages/RiskIdentificationPage'

describe('Add new risk identification testcases', () => {

    const riskIdentificationPage = new RiskIdentificationPage()
 
    beforeEach(() => {
        riskIdentificationPage.visit()
    })

        // Ignore the specific backdrop error
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('backdrop')) {
                return false;
            }
        });

    it('Verify form accessbility', () => {
        riskIdentificationPage.loginRiskOfficer();
        riskIdentificationPage.navigateToRiskIdenfication();
        riskIdentificationPage.addRiskIdentificationButton();
        riskIdentificationPage.selectStation();
    })

})