Cypress.Commands.add('Homepage', () => {
    cy.viewport(1920, 1080)
    cy.visit('/', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })
    cy.title().should('eq','VieON - Không Thể Rời Mắt')
})