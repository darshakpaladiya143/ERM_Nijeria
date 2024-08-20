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
        const contentToSet = 'This is a test content for CKEditor.';

        // Set content in CKEditor
        cy.setCkEditorContent('.ck-editor', contentToSet);

        // Verify the content
        cy.window().then((win) => {
            const editor = win.editorInstances && win.editorInstances['.ck-editor'];

            if (editor) {
                const editorData = editor.getData();
                expect(editorData).to.equal(contentToSet);
            } else {
                throw new Error('CKEditor instance not found in window');
            }
        });
        createMemoPage.riskRegisterTemplate();
        createMemoPage.selectTreatment();
        createMemoPage.selectIncident();
        createMemoPage.selectRiskIdentification();
        createMemoPage.sendTo();
        createMemoPage.saveForm();
        // createMemoPage.assertUserCreatedSuccessMessage('Expected Success Message'); 
    })
})
