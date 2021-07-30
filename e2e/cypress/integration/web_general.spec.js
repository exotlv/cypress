/// <reference types = "Cypress" />
import Constants from '../support/constant';

const lightTheme = Constants.LightTheme;
const darkTheme = Constants.DarkTheme;
const urls = Constants.Urls;

function isDarkModeEnabled() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

describe('General suite of test', () => {
    Cypress.on('uncaught:exception', () => false);

    beforeEach(() => {
        cy.visit(Cypress.env('WebURL'));
        cy.waitForReact(5000, '#__next');
    });

    describe('Set of tests for header modal', () => {
        urls.forEach((url) => {
            it('Has all the elements in header', () => {
                cy.visit(`${Cypress.env('WebURL')}/${url}`);
                cy.get('[data-cy="header"] > nav > div > a').should('have.attr', 'href', '/');
                cy.get('[data-cy="header"] > nav')
                    .children()
                    .eq(1)
                    .children()
                    .should('have.length', 5);
                cy.get('[data-cy="nav-Play"]')
                    .eq(0)
                    .children()
                    .should('be.visible')
                    .should('have.attr', 'href', '/play');
                cy.get('[data-cy="nav-Watch"]')
                    .eq(0)
                    .children()
                    .should('be.visible')
                    .should('have.attr', 'href', '/watch');
                cy.get('[data-cy="nav-News"]')
                    .eq(0)
                    .children()
                    .should('be.visible')
                    .should('have.attr', 'href', '/news');
                cy.get('[data-cy="nav-Train"]')
                    .eq(0)
                    .children()
                    .should('be.visible')
                    .should('have.attr', 'href', '/train');
                cy.get('[data-cy="nav-Premium"]')
                    .eq(0)
                    .children()
                    .should('be.visible')
                    .should('have.attr', 'href', '/premium');
                cy.get('[data-cy="header"] > nav')
                    .children()
                    .eq(2)
                    .children()
                    .should('have.length', 3);
                // settings
                cy.get('[data-cy="modal-siteSettings"]').should('not.exist');
                cy.get('[data-cy="header"] > nav').children().eq(2).children().eq(1).click();
                cy.get('[data-cy="modal-siteSettings"]').should('be.visible');
                cy.get('body').type('{esc}');
                // sign up
                cy.get('[data-cy="modal-signUp"]').should('not.exist');
                cy.get('[data-cy="header"] > nav')
                    .children()
                    .eq(2)
                    .children()
                    .eq(2)
                    .children()
                    .eq(1)
                    .click();
                cy.get('[data-cy="modal-signUp"]').should('be.visible');
                cy.get('body').type('{esc}');
                // login
                cy.get('[data-cy="modal-signIn"]').should('not.exist');
                cy.get('[data-cy="header"] > nav')
                    .children()
                    .eq(2)
                    .children()
                    .eq(2)
                    .children()
                    .eq(3)
                    .click();
                cy.get('[data-cy="modal-signIn"]').should('be.visible');
                cy.get('body').type('{esc}');
                // ToDo Add search test after it is implemented
            });
        });
    });

    describe('Set of tests for settings modal', () => {
        it('Check auto theme', () => {
            cy.changeTheme(0);
            if (isDarkModeEnabled() === true) {
                cy.react('BackgroundCollage__StyledBackground').should(
                    'have.css',
                    'background-color',
                    darkTheme,
                );
            } else {
                cy.react('BackgroundCollage__StyledBackground').should(
                    'have.css',
                    'background-color',
                    lightTheme,
                );
            }
        });

        it('Check light theme', () => {
            cy.changeTheme(1);
            cy.react('BackgroundCollage__StyledBackground').should(
                'have.css',
                'background-color',
                lightTheme,
            );
        });

        it('Check dark theme', () => {
            cy.changeTheme(2);
            cy.react('BackgroundCollage__StyledBackground').should(
                'have.css',
                'background-color',
                darkTheme,
            );
        });
    });
});
