import CreateMemoPage from '../pages/CreateMemoPage';

describe('Head of risk can create memo into the ERM Project', () => {

    const createMemoPage = new CreateMemoPage()

    beforeEach(() => {
        createMemoPage.visit()
    })

    it('Fill the memo form with all necessary details to create memo',() => {
        createMemoPage.loginSuperAdmin();
        createMemoPage.navigateToCreateMemoPage();
        createMemoPage.selectYear();
        createMemoPage.selectQuater();
        createMemoPage.fromDate();
        createMemoPage.toDate();
        createMemoPage.riskSubmissionEndDate();
        createMemoPage.riskReportSubmissionDate();
        createMemoPage.subject();
        
        cy.initializeCkEditor('.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred').then((editor) => {
            editor.setData('Your content here');

        cy.wait(2000)
      
        // Optionally, verify content
        cy.wrap(editor.getData()).then((html) => {
                const textContent = html.replace(/<[^>]*>/g, ''); // Remove HTML tags
                expect(textContent).to.equal('Your content here');
              });              
          });

        createMemoPage.riskRegisterTemplate();
        createMemoPage.selectTreatment();
        createMemoPage.selectIncident();
        createMemoPage.selectRiskIdentification();
        createMemoPage.sendTo();
        createMemoPage.saveForm();
        createMemoPage.assertMemoCreatedSuccessMessage('Memo added successfully',20000);
        createMemoPage.memoListing();
    })

    it('Login with the MD account to view and approve that request',() => {
        createMemoPage.loginwithMD();
        createMemoPage.memoLink();
        createMemoPage.ViewMemo();
    })
 



})