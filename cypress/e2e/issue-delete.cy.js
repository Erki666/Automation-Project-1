describe('Issue Deletion', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible');
      });
    });

    it('Should delete an issue', () => {
      // Deleting issue
      cy.get('[data-testid="icon:trash"]').click();
      // Confirm the deletion
      cy.get('.sc-bwzfXH.dIxFno.sc-kGXeez.bLOzZQ').click();
      // Assert that deletion confirmation dialogue is not visible
      cy.get('[data-testid="deletion-confirmation-dialogue"]').should('not.exist');
      // Assert that the issue is deleted and not displayed on the Jira board anymore
      cy.visit('/'); // Visit the Jira board page
      cy.contains('This is an issue of type: Task.').should('not.exist');
    });

    it('Should start deleting an issue but then cancelling the action', () => {
        // Deleting issue
        cy.get('[data-testid="icon:trash"]').click();
        // Canceling deleting
        cy.get('.sc-bwzfXH.ewzfNn.sc-kGXeez.bLOzZQ').click();
        // Assert that cancelling confirmation dialogue is not visible
        cy.get('[data-testid="cancel-confirmation-dialogue"]').should('not.exist')
        // Visit the Jira board page
        cy.visit('/');
        // Assert that the issue is not deleted and still displayed on the Jira board
        cy.contains('This is an issue of type: Task.').should('be.visible');
      });
  });