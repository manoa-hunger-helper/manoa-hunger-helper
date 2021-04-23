import { Selector } from 'testcafe';

class AllvendorsPage {
  constructor() {
    this.pageId = '#AllVendors-page';
    this.pageSelector = Selector(this.pageId);
  }
}

async isDisplayed(testController) {
  
}