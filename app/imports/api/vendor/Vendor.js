import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VendorsCollection. It encapsulates state and variable values for menu.
 */
class VendorCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      /* TODO LATER
      location: String,
      image: String,
      operationDays: String,
      operationHours: String,
      paymentOptions: String,
      dietaryOptions: String,
      description: String, */
      image: String,
      price: {
        type: String,
        allowedValues: ['$', '$$', '$$$'],
        defaultValue: '$',
      },
      location: String,
      state: {
        type: String,
        allowedValues: ['Open', 'Close'],
        defaultValue: 'Close',
      },
      businessdate: String,
      starttime: {
        type: Number,
        allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      },
      endtime: {
        type: Number,
        allowedValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      },
      paymentOptions: String,
      website: String,
      phone: String,
      email: String,
      type: String,
      owner: String,
      description: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.vendorPublicationName = `${this.name}.publication.vendor`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the VendorsCollection.
 * @type {VendorsCollection}
 */
export const Vendors = new VendorCollection();
