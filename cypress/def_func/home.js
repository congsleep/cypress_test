Cypress.Commands.add('Homepage', () => {
    cy.visit('/', { onBeforeLoad: (win) => { win.sessionStorage.clear() } })
    cy.title().should('eq','VieON - Không Thể Rời Mắt')
})

Cypress.Commands.add('Trigger_privilege_preview_panel', () => {
    cy.get('.user-login-event').trigger('mouseover')
})

Cypress.Commands.add('Check_hover_login_popup', () => {
    cy.Trigger_privilege_preview_panel()
    cy
        .get('..pane-container')
        .eq(0)
        .should('contain.text','Dành riêng cho người dùng đăng nhập VieON');

    cy
        .get('..pane-container')
        .eq(1)
        .should('contain.text','Không giới hạn thời gian xem');

    cy
        .get('..pane-container')
        .eq(2)
        .should('contain.text','Có thể bỏ qua quảng cáo');
        
    cy
        .get('..pane-container')
        .eq(3)
        .should('contain.text','Xem tiếp các nội dung vừa xem');

    cy
        .get('..pane-container')
        .eq(4)
        .should('contain.text','Lưu lại các nội dung yêu thích');

    cy
        .get('..pane-container')
        .eq(5)
        .should('contain.text','Xem các kênh truyền hình');
})