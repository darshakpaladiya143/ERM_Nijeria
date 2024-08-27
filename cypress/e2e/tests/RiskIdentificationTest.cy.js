import RiskIdentificationPage from '../pages/RiskIdentificationPage'

describe('Raised risk by riskChampion & Verify that risk showing into the GM listing Queue', () => {

    const riskIdentificationPage = new RiskIdentificationPage()
 
    beforeEach(() => {
        riskIdentificationPage.visit()
    })

        // Ignore if the specific backdrop error
        Cypress.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes('backdrop')) {
                return false;
            }
        });

    it('Fill the detail into the Risk Identification form & Save', () => {
        riskIdentificationPage.loginRiskOfficer();
        riskIdentificationPage.navigateToRiskIdenfication();
        riskIdentificationPage.addRiskIdentificationButton();
        riskIdentificationPage.selectYear();
        riskIdentificationPage.selectStation();
        riskIdentificationPage.riskDescription();
        riskIdentificationPage.selectCategory();
        riskIdentificationPage.selectSubCategory();
        riskIdentificationPage.enterSection();
        riskIdentificationPage.departmentalObjectives();
        riskIdentificationPage.impactFactor();
        riskIdentificationPage.selectOccurence();
        riskIdentificationPage.enterMitigration();
        riskIdentificationPage.enterRemark();
        riskIdentificationPage.saveButton();
        riskIdentificationPage.assertMemoCreatedSuccessMessage('Risk register added successfully',20000);
    })

})