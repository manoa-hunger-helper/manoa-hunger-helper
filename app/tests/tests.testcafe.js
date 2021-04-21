import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { allVendorPage } from './allvendor.page';
import { availableNowPage } from './availablenow.page';
import { menuPage } from './menu.page';
import { veganMenuPage } from './venganmenu.page';
import { drinkMenuPage } from './drinkmenu.page';
import { dessertMenuPage } from './dessertmenu.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the All Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAllVendorPage(testController);
  await allVendorPage.isDisplayed(testController);
  await allVendorPage.hasCard(testController);
});

test('Test the Available Now page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAvailableNowPage(testController);
  await availableNowPage.isDisplayed(testController);
  // await availableNowPage.hasCard(testController);
});

test('Test the Menu page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMenuPage(testController);
  await menuPage.isDisplayed(testController);
  await menuPage.usetypeSelector(testController);
  await menuPage.hasCard(testController);
});

test('Test the Recommendation Vegans page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoVeganPage(testController);
  await veganMenuPage.isDisplayed(testController);
  await veganMenuPage.hasCard(testController);
});

test('Test the Recommendation Drink page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoDrinkPage(testController);
  await drinkMenuPage.isDisplayed(testController);
  await drinkMenuPage.hasCard(testController);
});

test('Test the Recommendation Dessert page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoDessertPage(testController);
  await dessertMenuPage.isDisplayed(testController);
  // await veganMenuPage.hasCard(testController);
});
