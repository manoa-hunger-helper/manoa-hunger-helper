import { Selector } from 'testcafe';

class ViewMyInfoPage {
  constructor() {
    this.pageId = '#my-information-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least two row on table.  */
  async hasTable(testController) {
    const tableCount = Selector('tr').count;
    await testController.expect(tableCount).gte(1);
  }
}

export const viewMyInfoPage = new ViewMyInfoPage();
