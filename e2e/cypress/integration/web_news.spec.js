/// <reference types = "Cypress" />

describe('Chess24 News Page', () => {
    Cypress.on('uncaught:exception', () => false);
    beforeEach(() => {
        cy.visit(`${Cypress.env('WebURL')}/news`);
        cy.waitForReact(5000, '#__next');
        cy.get('title').should('contain', 'Chess24 News');
    });

    it('Check carousel scroll functionality', () => {
        // Click on dot for scrolling
        cy.get('.eyLvSG').children().last().click().waitForReact(2000);
        // Check Slider change
        cy.react('Slider__StyledSlider', { props: { gridAutoColumns: '100%' } }).should(
            'be.visible',
        );
    });

    it('Check news items contain links and opens an article', () => {
        cy.react('NewsList')
            .children()
            .each((listItem) => {
                const message = listItem.text();
                expect(listItem, message).to.have.attr('href').not.contain('undefined');
            });

        // Click on the first article and check that expected url matches current url
        cy.react('NewsList')
            .children()
            .first()
            .then((listItem) => {
                const targetUrl = listItem.attr('href');

                cy.wrap(listItem).click();
                cy.location().should((location) => {
                    expect(location.pathname).to.eq(targetUrl);
                });
            });
    });

    it('Check the grid selector changes', () => {
        // Check list view
        cy.getReact('NewsList').getProps('viewStyle').should('eq', 'list');
        // Check that items are displayed in grid columns
        cy.react('NewsList').children().first().should('have.css', 'grid-template-columns');

        // Check grid view
        cy.react('ListViewSwitch__StyledBox')
            .children()
            .children()
            .last()
            .click()
            .waitForReact(2000);
        // Check that items take the whole grid item
        cy.react('NewsList').children().first().should('have.css', 'grid-template-columns', 'none');
    });

    it('Check grid buttons', () => {
        // Intercept request to sanity
        cy.intercept('https://j7ywltkm.apicdn.sanity.io/**').as('sanityRequest');

        cy.react('Tabs__StyledBox')
            .eq(0)
            .children()
            .each((button, index) => {
                // First request is already loaded so we do not need to wait for it
                if (index !== 0) {
                    cy.wrap(button).should('be.visible').click().wait('@sanityRequest');
                } else {
                    cy.wrap(button).should('be.visible').click();
                }
            });
    });

    it('Check random news in list', () => {
        // Check first news in list. Open it and check that in URL /news exist.
        cy.react('GridParent')
            .should('be.visible')
            .react('LinkContainer__Container')
            .should('be.visible')
            .first()
            .click()
            .url()
            .should('include', '/news');
    });
});
