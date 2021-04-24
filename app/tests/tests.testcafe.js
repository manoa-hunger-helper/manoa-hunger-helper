import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userHomePage } from './userhome.page';
import { allVendorPage } from './allvendor.page';
import { availableNowPage } from './availablenow.page';
import { menuPage } from './menu.page';
import { veganMenuPage } from './venganmenu.page';
import { drinkMenuPage } from './drinkmenu.page';
import { dessertMenuPage } from './dessertmenu.page';
import { viewMyInfoPage } from './viewmyinfo.page';
import { addMyInfoPage } from './addmyinfo.page';
import { vendorHomePage } from './vendorhome.page';
import { myVendorPage } from './myvendor.page';
import { addVendorPage } from './addvendor.page';
import { addFoodPage } from './addfood.page';
import { adminHomePage } from './adminhome.page';
import { manageUserPage } from './manageuser.page';
import { manageVendorPage } from './managevendor.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'vendor@foo.com', password: 'changeme' };
const credentials3 = { username: 'admin@foo.com', password: 'changeme' };

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

test('Test the User Home page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await userHomePage.isDisplayed(testController);
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
  await availableNowPage.hasCard(testController);
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
  // await dessertMenuPage.hasCard(testController);
});

test('Test the View User Information page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoViewMyInfoPage(testController);
  await viewMyInfoPage.isDisplayed(testController);
  await viewMyInfoPage.hasTable(testController);
});

test('Test the Add User Information page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddMyInfoPage(testController);
  await addMyInfoPage.isDisplayed(testController);
});

test('Test the Vendor Home page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await vendorHomePage.isDisplayed(testController);
});

test('Test the My Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.gotoMyVendorPage(testController);
  await myVendorPage.isDisplayed(testController);
  await myVendorPage.hasTable(testController);
});

test('Test the Add Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.gotoAddVendorPage(testController);
  await addVendorPage.isDisplayed(testController);
  await addVendorPage.hasInput(testController);
});

test('Test the Add Food page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.gotoAddMenuPage(testController);
  await addFoodPage.isDisplayed(testController);
  await addFoodPage.hasInput(testController);
});

test('Test the Admin Home page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials3.username, credentials3.password);
  await adminHomePage.isDisplayed(testController);
});

test('Test the Manage User page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials3.username, credentials3.password);
  await navBar.gotoManageUserPage(testController);
  await manageUserPage.isDisplayed(testController);
  await manageUserPage.hasTable(testController);
});

test('Test the Manage Vendor page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials3.username, credentials3.password);
  await navBar.gotoManageVendorPage(testController);
  await manageVendorPage.isDisplayed(testController);
  await manageVendorPage.hasTable(testController);
});
