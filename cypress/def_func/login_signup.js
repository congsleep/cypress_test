Cypress.Commands.add('Trigger_privilege_preview_panel', () => {
    cy.get('div.pane.pane--user.pane--user-privilege.absolute.animate-fade-right').invoke('show')
    cy.get('.pane--user-privilege>.pane-container').children().should('be.visible')
    cy.get('.pane--user-privilege>.pane-container').children().should('have.length',7)
})

Cypress.Commands.add('Check_hover_login_popup', () => {
    cy.get('.pane--user-privilege>.pane-container>.pane-item').should('be.visible')
    cy
        .get('.pane--user-privilege>.pane-container>.pane-item')
        .eq(0)
        .should('contain.text','Dành riêng cho người dùng đăng nhập VieON');
    cy
        .get('.pane--user-privilege>.pane-container>.pane-item')
        .eq(1)
        .should('contain.text','Không giới hạn thời gian xem');
    cy
        .get('.pane--user-privilege>.pane-container>.pane-item')
        .eq(2)
        .should('contain.text','Có thể bỏ qua quảng cáo');
        
    cy
        .get('.pane--user-privilege>.pane-container>.pane-item')
        .eq(3)
        .should('contain.text','Xem tiếp các nội dung vừa xem');

    cy
        .get('.pane--user-privilege>.pane-container>.pane-item')
        .eq(4)
        .should('contain.text','Lưu lại các nội dung yêu thích');

    cy
        .get('.pane--user-privilege>.pane-container>.pane-item')
        .eq(5)
        .should('contain.text','Xem các kênh truyền hình');
    
    cy
        .get('.pane--user-privilege>.pane-container>.pane-item')
        .eq(6)
        .should('contain.text','Đăng nhập')
        .and('contain.text','Đăng ký')
})