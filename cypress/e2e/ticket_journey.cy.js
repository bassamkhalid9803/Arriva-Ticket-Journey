import SharedMethods from '../support/SharedMethods'
import  * as ticket_elements from '../support/pageObject/ticket_journey_elements.cy'
import 'cypress-iframe';
describe('Arriva Bus - Homepage', () => {
 beforeEach(() => {
   // cy.safeVisit('https://www.arrivabus.co.uk/buy-tickets');
    SharedMethods.visitWebsite(ticket_elements.url)
    SharedMethods.waitFunction(ticket_elements.wait);
    SharedMethods.clickElement(ticket_elements.cookies);
   // SharedMethods.waitFunction(ticket_elements.wait)
    SharedMethods.uncaughtException(ticket_elements.uncaughtException)
   
   
  })
  
it('Load the page with specified location', () => {

    SharedMethods.ElementShouldContain(ticket_elements.region_select);
    // SharedMethods.waitFunction(ticket_elements.wait)
    SharedMethods.ElementShouldContain(ticket_elements.zone_select)
    // SharedMethods.waitFunction(ticket_elements.wait)
    SharedMethods.ElementShouldContain(ticket_elements.ticket_type_select);
    // SharedMethods.waitFunction(ticket_elements.wait)
    SharedMethods.ElementEqOne(ticket_elements.number_of_tickets_select);
    SharedMethods.ElementShouldContain(ticket_elements.button_checkout);
    SharedMethods.ElementShouldContain(ticket_elements.sign_in_button);
    SharedMethods.clickElement(ticket_elements.emailInput);
    SharedMethods.TypeText(ticket_elements.emailInput,ticket_elements.username);
    SharedMethods.clickElement(ticket_elements.emailPassword);
    SharedMethods.TypeText(ticket_elements.emailPassword,ticket_elements.password);
    SharedMethods.clickElement(ticket_elements.login_button);
    SharedMethods.waitFunction(ticket_elements.wait);
    SharedMethods.clickElement(ticket_elements.card_select_button);
    //SharedMethods.waitFunction(ticket_elements.wait);
    SharedMethods.Timeout(ticket_elements.timeout);

    SharedMethods.enterCardHolderName(ticket_elements.card_holder_name);
    SharedMethods.enterCardNumber(ticket_elements.card_number);
    SharedMethods.enterCardExpiry(ticket_elements.card_expiry_date);
    SharedMethods.enterCardCVV(ticket_elements.cvv1);
    SharedMethods.enterPostalCode(ticket_elements.postal_code);
    SharedMethods.confirmPayment();


    /*SharedMethods.typeIniFrame(ticket_elements.cardholderName);
    SharedMethods.typeIniFrame(ticket_elements.cardNumber);
    SharedMethods.typeIniFrame(ticket_elements.expirationDate);
    SharedMethods.typeIniFrame(ticket_elements.cvv);
    SharedMethods.typeIniFrame(ticket_elements.postalCode);*/







  

 });


  })
