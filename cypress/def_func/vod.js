Cypress.Commands.add('Play_AVOD_on_ribbon', () =>{
    cy
        .get('#header')
        //.contains('3a946288-62a9-4be0-85dc-d9da732df69e9f3e8b4c-abd8-46c7-9841-8178d84ac484')
        .scrollIntoView({offset: {top: 3500, left: 0}, duration: 3000, easing: 'linear'})
})