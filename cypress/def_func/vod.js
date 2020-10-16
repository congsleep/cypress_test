Cypress.Commands.add('Play_AVOD_on_ribbon', () =>{
    cy.get('#__next ').find('div:nth-child(6)').scrollIntoView().click()
})