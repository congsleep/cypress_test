import '../variables/variables.js'
import '../def_func/start_up.js'
import '../def_func/login_signup.js'
import '../def_func/vod.js'



describe('Check pop-up Đăng nhập', function () {
//   it('C1477-UI-Popup Đăng nhập từ icon user', function () {
// 	cy.Homepage()
// 	cy.Trigger_privilege_preview_panel()
// 	cy.Check_hover_login_popup()
//   })

  it('C1478-UI-Popup Đăng nhập khi chọn AVOD', function () {
	cy.Homepage()
	cy.Play_AVOD_on_ribbon()
  })

//   it('C1479-UI-Popup Đăng nhập khi chọn SVOD', function () {
// 	cy.Homepage()
//   })
//   it('C1511-UI-Popup đăng nhập khi chọn chất lượng VOD', function () {
// 	cy.Homepage()
//   })
})