Cypress.Commands.add('Play_AVOD_on_top_10_ribbon', () =>{
    cy
        .get('#footer')
        //.contains('3a946288-62a9-4be0-85dc-d9da732df69e9f3e8b4c-abd8-46c7-9841-8178d84ac484')
        .scrollIntoView({offset: {top: 1200, left: 0}, duration: 8000, timeout: 30000})

    // cy
    //     .get('#fcd453d0-e837-493f-85a5-83c8b759ceb01e013a15-766d-462c-a384-2fc1f85a51c6')
    //     .click()
})

// Cypress.Commands.add('Login_required_pop_up', () =>{
//     cy.get('.mask-inner > img').should
// })