describe('Login API Test', () => {

    const loginUrl = 'http://clientapp.narola.online:1195/api/Auth/Login/';
  
    it('should successfully log in with valid credentials', () => {
      // Define the login payload
      const loginPayload = {
        username: "johndoe@yopmail.com",
        password: "Password123!"
      };
  
      // Make the POST request to the login API
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: loginPayload,
        failOnStatusCode: false, // Prevent Cypress from failing the test on 4xx or 5xx status
      }).then((response) => {
        // Assert the status code
        expect(response.status).to.eq(200); // Assuming a 200 status indicates a successful login
  
        // Assert the response body contains a token or expected data
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.be.a('string');
      });
    });
  
    it('should fail to log in with invalid credentials', () => {
      // Define the login payload with invalid credentials
      const invalidLoginPayload = {
        username: 'invalidUser',
        password: 'invalidPassword'
      };
  
      // Make the POST request to the login API
      cy.request({
        method: 'POST',
        url: loginUrl,
        body: invalidLoginPayload,
        failOnStatusCode: false, // Prevent Cypress from failing the test on 4xx or 5xx status
      }).then((response) => {
        // Assert the status code
        expect(response.status).to.eq(401); // Assuming a 401 status indicates an unauthorized login
      });
    });
  });
  