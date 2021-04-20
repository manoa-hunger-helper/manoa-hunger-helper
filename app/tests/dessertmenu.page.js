import { Selector } from 'testcafe';

class DessertMenuPage {
  constructor() {
    this.pageId = '#dessert-menu-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least two card.  */
  /** async hasCard(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(2);
  } */
}

export const dessertMenuPage = new DessertMenuPage();
