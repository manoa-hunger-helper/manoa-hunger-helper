import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Vendors } from '../imports/api/vendor/Vendor';

Meteor.methods({

  addvendortonewuser: function () {
    const user = Meteor.user();
    Roles.createRole('vendor', { unlessExists: true });
    Roles.addUsersToRoles(user, 'vendor');
  },

});
