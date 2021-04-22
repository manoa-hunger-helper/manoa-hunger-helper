import { Selector } from 'testcafe';

class AddVendorPage {
  constructor() {
    this.pageId = '#add-vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has input area.  */
  async hasInput(testController) {
    const inputCount = Selector('input').count;
    await testController.expect(inputCount).gte(3);
  }
}

export const addVendorPage = new AddVendorPage();
