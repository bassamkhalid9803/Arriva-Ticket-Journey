import * as ticket_elements from './pageObject/ticket_journey_elements.cy';

class SharedMethods{
    visitWebsite(url)
    {
        return cy.visit(url)
    }
    clickElement(element)
    {
        return cy.get(element).click()
    }
    ElementShouldContain(element)
    {
       return cy.get(element).eq(0).click();
    }
    ElementEqOne(element)
    {
        return cy.get(element).eq(1).click();

    }
    TypeText(element,text)
    {
       cy.get(element).type(text);
    }
    hoverMouse(element)
    {
        return cy.get(element).trigger('mouseover')
    }
    
    getLocation(lat, long) {
    cy.visit(ticket_elements.url, {
      onBeforeLoad(win) {
       cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
        cb({
          coords: {
            latitude:lat,
            longitude:long,
            accuracy: 100
          }
        });
      });

      cy.stub(win.navigator.geolocation, 'watchPosition').callsFake((cb) => {
        cb({
          coords: {
            latitude:lat,
            longitude:long,
            accuracy: 100
          }
        });
      });
      }
    });
    cy.log(lat)
    cy.log(long)
  }
    waitFunction(value)
    {
        cy.wait(value)
    }
    
    uncaughtException(element)
    {
        Cypress.on(element, (err, runnable) => 
            {

            return false;

            });
    }
    Timeout(timeout)
    {
        timeout_value:timeout
    }

    
   // Helper method to interact with an input inside an iframe
     enterIntoIframeField(iframeSelector, inputSelector, value) {
       cy.get(iframeSelector, { timeout: 10000 }).then($iframe => {
         const body = $iframe.contents().find('body');
         cy.wrap(body).find(inputSelector).type(value, { force: true });
       });
     }
     enterCardNumber(value) {
       this.enterIntoIframeField(ticket_elements.cardNumberIframeSelector, ticket_elements.cardNumberInput, value);
     }
     enterCardExpiry(value) {
       this.enterIntoIframeField(ticket_elements.cardExpiryIframeSelector, ticket_elements.cardExpiryInput, value);
     }
     enterCardCVV(value) {
       this.enterIntoIframeField(ticket_elements.cardCVVIframeSelector, ticket_elements.cardCVVInput, value);
     }
     enterPostalCode(value) {
       this.enterIntoIframeField(ticket_elements.cardPostalIframeSelector, ticket_elements.cardPostalInput, value);
     }
     confirmPayment() {
       cy.get(ticket_elements.confirmPaymentButton, { timeout: 10000 }).click({ force: true });
     }
    enterCardHolderName(name) {
     cy.get(ticket_elements.cardHolderIframeSelector, { timeout: 10000 }).then($iframe => {
       const body = $iframe.contents().find('body');
       cy.wrap(body)
         .find(ticket_elements.cardHolderNameInput)
         .type(name, { force: true });
     });
}








}

export default new SharedMethods()

