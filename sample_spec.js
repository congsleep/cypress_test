describe('My First Test', function () {
  it('Mở VieON', function () {
  	cy.visit('https://testing.vieon.vn')
  	cy.contains('Truyền hình').click()
  	cy.contains('VIP').click()
  	cy.contains('Livestream').click()
  })
})