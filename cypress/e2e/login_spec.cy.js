/* eslint-disable no-undef */
describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001'); 
    });
  
    it('should log in successfully with valid credentials', () => {
      cy.get('#username').type('admin');
      cy.get('#password').type('admin');
      cy.get('#loginButton').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Login successful');
      });
    });
  
    it('should fail login with invalid credentials', () => {
      cy.get('#username').type('wronguser');
      cy.get('#password').type('wrongpass');
      cy.get('#loginButton').click();
      cy.get('#errorMessage').should('contain', 'Invalid username or password');
    });
  
    it('should display an error message when login fails', () => {
      cy.get('#username').type('wronguser');
      cy.get('#password').type('wrongpass');
      cy.get('#loginButton').click();
      cy.get('#errorMessage').should('be.visible');
    });
  });
  