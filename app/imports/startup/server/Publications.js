import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Vendors } from '../../api/vendor/Vendor';
import { FoodMenus } from '../../api/menu/FoodMenu';
import { Information } from '../../api/information/Information';
import { Featured } from '../../api/featured/Featured';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// If logged in, then publish documents owned by this vendor. Otherwise publish nothing.
Meteor.publish(FoodMenus.userPublicationName, function () {
  if (this.userId) {
    return FoodMenus.collection.find();
  }
  return this.ready();
});
Meteor.publish(Information.userPublicationName, function () {
  if (this.userId) {
    return Information.collection.find();
  }
  return this.ready();
});

Meteor.publish(Featured.userPublicationName, function () {
  if (this.userId) {
    return Featured.collection.find();
  }
  return this.ready();
});

Meteor.publish(Vendors.userPublicationName, function () {
  if (this.userId) {
    return Vendors.collection.find();
  }
  return this.ready();
});

// Vendor-level publication.
// If logged in, then publish documents owned by this vendor. Otherwise publish nothing.
Meteor.publish(Vendors.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    const username = Meteor.users.findOne(this.userId).username;
    return Vendors.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(FoodMenus.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    const username = Meteor.users.findOne(this.userId).username;
    return FoodMenus.collection.find({ owner: username });
  }
  return this.ready();
});
Meteor.publish(Information.vendorPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'vendor')) {
    return Information.collection.find();
  }
  return this.ready();
});
// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Vendors.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Vendors.collection.find();
  }
  return this.ready();
});

Meteor.publish(Information.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Information.collection.find();
  }
  return this.ready();
});

Meteor.publish(FoodMenus.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return FoodMenus.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
