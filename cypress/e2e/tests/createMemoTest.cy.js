import CreateMemoPage from '../pages/CreateMemoPage';

describe('Head of risk can create memo into the ERM Project', () => {

    const createMemoPage = new CreateMemoPage()

    beforeEach(() => {
        createMemoPage.visit()
        createMemoPage.loginSuperAdmin()
        createMemoPage.navigateToCreateMemoPage()
    })

    it('Fill the memo form with all necessary details', () => {
        createMemoPage.selectQuater();
        createMemoPage.fromDate();
        createMemoPage.toDate();
        createMemoPage.riskSubmissionEndDate();
        createMemoPage.riskReportSubmissionDate();
        createMemoPage.subject();
        // createMemoPage.description();
        const contentToSet = 'This is a test content for CKEditor.';
        cy.setCkEditorContent('Remark', contentToSet);
        createMemoPage.riskRegisterTemplate();
        createMemoPage.selectTreatment();
        createMemoPage.selectIncident();
        createMemoPage.selectRiskIdentification();
        createMemoPage.sendTo();
        createMemoPage.saveForm();
        // createMemoPage.assertUserCreatedSuccessMessage('Expected Success Message'); 
    })
})
