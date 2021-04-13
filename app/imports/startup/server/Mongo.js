import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Vendors } from '../../api/vendor/Vendor.js';
import { FoodMenus } from '../../api/menu/FoodMenu.js';
import { Profiles } from '../../ui/pages/Profile';
import { ProfilesPreferences } from '../../api/profiles/ProfilesPreferences';
import { Preferences } from '../../api/preferences/Preferences';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}
/** Define an interest.  Has no effect if interest already exists. */
function addPreference(pref) {
  Preferences.collection.update({ name: pref }, { $set: { name: pref } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ name, preferences, price, picture, bio, vendor }) {
  console.log(`Defining profile ${name}`);
  // Create the profile.
  Profiles.collection.insert({ name, preferences, price, picture, bio, vendor });
  // Add interests and projects.
  preferences.map(pref => ProfilesPreferences.collection.insert({ profile: name, pref }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  preferences.map(pref => addPreference(pref));
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

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
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
