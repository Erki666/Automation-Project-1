describe('Create issue', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    cy.visit(url + '/board?modal-issue-create=true');
    });
    // Creating a new issue
    cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('.ql-editor').type('My Bug description');
    cy.get('input[name="title"]').type('Bug');
    cy.get('button[type="submit"]').click();
    });
    // Assert that successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    // Assert that the list contains the newly created issue
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
    cy.get('[data-testid="list-issue"]').should('have.length', '5').first().find('p').contains('Bug');
    });
  });
  
  it('Adding estimation, changing it and deleting it', () => {
    // Visit the detail page of the created issue
    cy.contains('p', 'Bug').click();
    // Adding value to original estimate
    cy.get('input[placeholder="Number"]').type('10');
    cy.contains('10h estimated').should('be.visible')
    cy.get('[data-testid="icon:close"]').click()
    // Assert that the original estimation is saved
    cy.contains('p', 'Bug').click();
    cy.get('input[placeholder="Number"]').should('be.visible', '10');
    cy.get('[data-testid="icon:close"]').click()

    // Changing estimation
    cy.contains('p', 'Bug').click();
    cy.get('input[placeholder="Number"]').clear().type('20');
    cy.contains('20h estimated').should('be.visible')
    cy.get('[data-testid="icon:close"]').click()
    // Assert that the changed estimation is saved
    cy.contains('p', 'Bug').click();
    cy.get('input[placeholder="Number"]').should('be.visible', '20');
    cy.get('[data-testid="icon:close"]').click()

    // Deleting estimation
    cy.contains('p', 'Bug').click();
    cy.get('input[placeholder="Number"]').clear();
    cy.get('input[placeholder="Number"]').should('be.visible', '' )
    cy.get('[data-testid="icon:close"]').click()

  });
  
  it('Logging spent time to recently created issue and Removing logged time', () => {

  
    // Logging spent time to recently created issue
    cy.get('[data-testid="list-issue"]');
    cy.contains('p', 'Bug').click();
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').first().should('be.visible');
    cy.get('input[placeholder="Number"]').eq(1).type('2');
    cy.get('input[placeholder="Number"]').eq(1).should('have.value', '2').should('be.visible');
    cy.get('input[placeholder="Number"]').eq(2).type('5');
    cy.get('input[placeholder="Number"]').eq(2).should('have.value', '5').should('be.visible');
    cy.get('[data-testid="modal:tracking"]').contains('Done').click()
  
    // Removing logged spent time from recently created issue
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').first().should('be.visible');
    cy.get('input[placeholder="Number"]').eq(1).clear();
    cy.get('input[placeholder="Number"]').eq(1).should('be.visible');
    cy.get('input[placeholder="Number"]').eq(2).clear();
    cy.get('input[placeholder="Number"]').eq(2).should('be.visible');
    cy.get('[data-testid="modal:tracking"]').contains('Done').click()
  
  
    });
});