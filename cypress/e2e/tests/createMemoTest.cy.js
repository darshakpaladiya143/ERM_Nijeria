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
        
        const editorSelector = '.ck-editor__editable'; // Replace with your CKEditor selector
        const contentToSet = 'This is the content to set in CKEditor.';
    
        // Set content in CKEditor
        cy.setCkEditorContent(editorSelector, contentToSet);
    
        // Verify the content
        // cy.window().then((win) => {
        //   const editor = win.editorInstance; // Access the editor instance
        //   if (editor) {
        //     cy.wrap(editor.getData()).should('equal', contentToSet);
        //   } else {
        //     cy.log('CKEditor instance not found');
        //   }
        // });
        createMemoPage.riskRegisterTemplate();
        createMemoPage.selectTreatment();
        createMemoPage.selectIncident();
        createMemoPage.selectRiskIdentification();
        createMemoPage.sendTo();
        createMemoPage.saveForm();
        // createMemoPage.assertUserCreatedSuccessMessage('Expected Success Message'); 
    })

})