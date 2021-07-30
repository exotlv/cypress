/// <reference types = "Cypress" />

describe('Chess24 Play Page', () => {
    Cypress.on('uncaught:exception', () => false);
    beforeEach(() => {
        cy.visit(`${Cypress.env('WebURL')}/play`);
        cy.waitForReact(5000, '#__next');
        cy.get('title').should('contain', 'Chess24 Play');
    });

    it('Has all the required elements', () => {
        cy.get('[data-cy="header"]').should('be.visible');
        cy.get('[data-cy="select-game"]').should('be.visible');
        cy.get('[data-cy="create-game"]').should('be.visible');
        cy.get('[data-cy="accept-challenge"]').should('be.visible');
        cy.get('[data-cy="player-info"]').should('be.visible');
        cy.get('[data-cy="metagame-info"]').should('be.visible');
        cy.get('[data-cy="social-twitch"]').should('be.visible');
        cy.get('[data-cy="social-twitter"]').should('be.visible');
        cy.get('[data-cy="social-youtube"]').should('be.visible');
        cy.get('[data-cy="footer"]').should('be.visible');
    });

    it('Has all quick games availble', () => {
        cy.get('[data-cy="select-game"]').children().should('have.length', 2);
        cy.get('[data-cy="select-game"]').children().eq(0).should('be.visible');
        cy.get('[data-cy="select-game"]')
            .children()
            .eq(1)
            .children()
            .should('have.length', 5)
            .each(($el) => {
                cy.wrap($el).should('be.visible');
            });
    });

    it('Has all create game elements', () => {
        cy.get('[data-cy="create-game"] > h4').should('be.visible');
        cy.get('[data-cy="create-game"] > div')
            .children()
            .should('have.length', 3)
            .each(($el) => {
                cy.wrap($el).should('be.visible');
            });
    });
});
