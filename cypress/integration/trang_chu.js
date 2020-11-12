import '../variables/variables.js'
import '../def_func/start_up.js'
import '../def_func/login_signup.js'
import '../def_func/vod.js'



describe('Check pop-up Đăng nhập', function () {
  // it('C1477-UI-Popup Đăng nhập từ icon user', function () {
	// cy.Homepage()
	// cy.Trigger_privilege_preview_panel()
	// cy.Check_hover_login_popup()
  // })

//   it('C1478-UI-Popup Đăng nhập khi chọn AVOD', function () {
// 	cy.Homepage()
// 	cy.Play_AVOD_on_top_10_ribbon()
//   })

//   it('C1479-UI-Popup Đăng nhập khi chọn SVOD', function () {
// 	cy.Homepage()
//   })
//   it('C1511-UI-Popup đăng nhập khi chọn chất lượng VOD', function () {
// 	cy.Homepage()
//   })

  it('Test play/pause video', function () {
	cy.Homepage()
	cy.get('.billboard-content-inner > .button').should('be.visible').click()
	cy.get('.modal-body', {timeout: 10000})
		.should('be.visible')
		.and('have.text','Vui lòng đăng nhập để xem ngay nội dung này')
	cy.get('.modal-footer > .button-group',{timeout: 10000})
		.should('be.visible')
		.children().should('have.length', 2)
	cy.get('[style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);"]').click()
	cy.get('#phoneNumber').type('0888455133')
	cy.get('#password').type('111111')
	cy.get('.form > .secondary').click()
	// Video phát sau khi đăng nhập
	cy.get('.controls--bottom').invoke('show')
	cy.get('.controls-bottom-container > .controls-button-play',{timeout: 10000})
		.should('have.attr','title', 'Tạm dừng') // Có attribute title = Dừng
		.click()
	cy.get('.controls-bottom-container > .controls-button-play',{timeout: 10000})
		.should('have.attr','title', 'Phát')


  })
})