Cypress.Commands.add('Homepage', () => {
    cy.visit('/', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })
    cy.title().should('eq','VieON - Không Thể Rời Mắt')
})