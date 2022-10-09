/// <reference types="cypress" />
describe('firstpart', () => {
    const NamDest = 'Dublin'
    it('from destination to formular', () => {
        cy.intercept('**/graphql?featureName=SearchReturnItinerariesQuery')
            .as('results')
        cy.setCookie('__kwc_agreed', 'true')
        cy.visit('https://www.kiwi.com/en')
        cy.get('[data-test="PlacePickerInput-destination"]')
            .find('[data-test="SearchField-input"]').type(NamDest)
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .should('be.visible')
            .contains(NamDest).click()
        //pridaj cestujúceho    ??
        cy.get('[data-test="PassengersField"]').click()
        //cy.get('[data-test="PassengersRow-adults"]').find()
        cy.get('[data-test="PassengersFieldFooter-done"]').click({ force: true })
        window.localStorage.setItem('bookingcom_extension_default', false)
        cy.get('[data-test="LandingSearchButton"]').click()
        cy.get('[data-test="SortBy-price"]').click()
        cy.wait('@results')
        cy.get('[data-test="ResultCardPrice"]')
            .eq(0)
            .should('be.visible')
        cy.get('[data-test="ResultCardWrapper"]').eq(0)
            .click({ force: true })


    })
})