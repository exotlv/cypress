/// <reference types = "Cypress" />

describe('Test cases related to user account', () => {
    Cypress.on('uncaught:exception', () => false);

    beforeEach(() => {
        cy.visit(Cypress.env('WebURL'));
        cy.waitForReact(5000, '#__next');
    });

    it('Is not possible to log in with incorrect password', () => {
        cy.get('[data-cy="sign-in"]').eq(1).click();
        cy.get('input[name="username"]').eq(1).click().type(Cypress.env('userName'));
        cy.get('input[name="password"]').eq(1).click().type('Incorrect_password');
        cy.get('button[type="submit"]').eq(1).click();
        cy.get('.cPdmxW').should('be.visible');
    });

    it('Is not possible to log in with incorrect user name', () => {
        cy.get('[data-cy="sign-in"]').eq(1).click();
        cy.get('input[name="username"]').eq(1).click().type('Incorrect_user');
        cy.get('input[name="password"]').eq(1).click().type(Cypress.env('userPassword'));
        cy.get('button[type="submit"]').eq(1).click();
        cy.get('.cPdmxW').should('be.visible');
    });

    it('Has custom mask on password field', () => {
        cy.get('[data-cy="sign-in"]').eq(1).click();
        cy.get('input[name="password"]').eq(1).click().type(Cypress.env('userPassword'));
        cy.get('input[name="password')
            .eq(1)
            .should('be.visible')
            .should('have.css', 'font-family')
            .and('match', /font-mask-password/);
    });

    it('Can turn on and off password field mask', () => {
        cy.get('[data-cy="sign-in"]').eq(1).click();
        cy.get('input[name="password"]').eq(1).click().type(Cypress.env('userPassword'));
        cy.get('input[type="password')
            .eq(1)
            .should('be.visible')
            .should('have.value', Cypress.env('userPassword'));
        cy.react('PasswordField__ShowPassword').eq(0).click();
        cy.get('input[type="text').eq(2).should('be.visible').should('have.value', 'chess24_test');
    });

    it('Is possible to log in', () => {
        cy.get('[data-cy="sign-in"]').eq(1).click();
        cy.get('input[name="username"]').eq(1).click().type(Cypress.env('userName'));
        cy.get('input[name="password"]').eq(1).click().type(Cypress.env('userPassword'));
        cy.get('button[type="submit"]').eq(1).click();
        cy.get('button[data-cy="logout"]').eq(1).contains('Logout').click();
    });
});
