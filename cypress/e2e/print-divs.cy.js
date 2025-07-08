describe('Print all divs on the page', () => {
  it('Logs the outerHTML of each div', () => {
    cy.visit('https://www.arrivabus.co.uk/'); // Replace with your actual URL

    cy.get('div')
      .each(($el, index) => {
        console.log(`Div ${index + 1}: ${$el.prop('outerHTML')}`);
      });
  });
});
