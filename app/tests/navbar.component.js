import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  /** go to all vendor page. */
  async gotoAllVendorPage(testController) {
    await testController.click('#all-vendor-page');
  }

  /** go to available now page. */
  async gotoAvailableNowPage(testController) {
    await testController.click('#available-now-page');
  }

  /** go to menu page. */
  async gotoMenuPage(testController) {
    await testController.click('#menu-page');
  }

  async gotoVeganPage(testController) {
    await testController.click('#recomm-dropdown');
    await testController.click('#vegan-menu-page');
  }

  async gotoDrinkPage(testController) {
    await testController.click('#recomm-dropdown');
    await testController.click('#drink-menu-page');
  }

  async gotoDessertPage(testController) {
    await testController.click('#recomm-dropdown');
    await testController.click('#dessert-menu-page');
  }

  async gotoViewMyInfoPage(testController) {
    await testController.click('#information-dropdown');
    await testController.click('#my-information');
  }

  async gotoAddMyInfoPage(testController) {
    await testController.click('#information-dropdown');
    await testController.click('#add-my-information');
  }

  /** go to my vendor page. */
  async gotoMyVendorPage(testController) {
    await testController.click('#my-vendor-page');
  }

  /** go to add vendor page. */
  async gotoAddVendorPage(testController) {
    await testController.click('#add-vendor-page');
  }

  /** go to add menu page. */
  async gotoAddMenuPage(testController) {
    await testController.click('#add-menu-food-page');
  }

  /** go to manage user page. */
  async gotoManageUserPage(testController) {
    await testController.click('#manage-user-page');
  }

  /** go to manage vendor page. */
  async gotoManageVendorPage(testController) {
    await testController.click('#manage-vendor-page');
  }
}

export const navBar = new NavBar();
