import { PartyCalculatorPage } from './app.po';

describe('party-calculator App', () => {
  let page: PartyCalculatorPage;

  beforeEach(() => {
    page = new PartyCalculatorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
