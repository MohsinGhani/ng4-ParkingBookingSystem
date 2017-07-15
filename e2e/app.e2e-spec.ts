import { ParkingBookingSystemPage } from './app.po';

describe('parking-booking-system App', () => {
  let page: ParkingBookingSystemPage;

  beforeEach(() => {
    page = new ParkingBookingSystemPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
