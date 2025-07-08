import SharedMethods from '../support/SharedMethods'
import  * as ticket_elements from '../support/pageObject/location_stub_elements.cy'

describe('Arriva Bus - Homepage', () => {
 beforeEach(() => {
    SharedMethods.getLocation(ticket_elements.latitude, ticket_elements.longitude);
   
   
  })
  
it('Load the page with specified location', () => {

     SharedMethods.waitFunction(ticket_elements.wait);
  //  SharedMethods.visitWebsite(ticket_elements.url)
    SharedMethods.waitFunction(ticket_elements.wait);
    SharedMethods.clickElement(ticket_elements.cookies);
    SharedMethods.waitFunction(ticket_elements.wait)
    SharedMethods.uncaughtException(ticket_elements.uncaughtException)


    
  
  

 });


  })
