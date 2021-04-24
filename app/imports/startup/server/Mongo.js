import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Vendors } from '../../api/vendor/Vendor.js';
import { FoodMenus } from '../../api/menu/FoodMenu.js';
import { Information } from '../../api/information/Information.js';
import { Featured } from '../../api/featured/Featured';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}
function addUser(data) {
  console.log(`  Adding: ${data.firstname} (${data.owner})`);
  Information.collection.insert(data);
}

// Initialize the database with a default vendor document.
function addVendor(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Vendors.collection.insert(data);
}

// Initialize the database with a default vendor document.
function addFood(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  FoodMenus.collection.insert(data);
}
// Initialize the database with a default featured document.
function addFeatured(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Featured.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Information.collection.find().count() === 0) {
  if (Meteor.settings.defaultInformation) {
    console.log('Creating default user.');
    Meteor.settings.defaultInformation.map(data => addUser(data));
  }
}
// Initialize the VendorsCollection if empty.
if (Vendors.collection.find().count() === 0) {
  if (Meteor.settings.defaultVendor) {
    console.log('Creating default vendor.');
    Meteor.settings.defaultVendor.map(data => addVendor(data));
  }
}

// Initialize the MenuCollection if empty.
if (FoodMenus.collection.find().count() === 0) {
  if (Meteor.settings.defaultFoodMenu) {
    console.log('Creating default food menu.');
    Meteor.settings.defaultFoodMenu.map(data => addFood(data));
  }
}

if (Featured.collection.find().count() === 0) {
  if (Meteor.settings.defaultFeaturedMenu) {
    console.log('Creating default featured food menu.');
    Meteor.settings.defaultFeaturedMenu.map(data => addFeatured(data));
  }
}
