import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The FoodMenusCollection. It encapsulates state and variable values for food menu.
 */
class FoodMenuCollection {
  constructor() {
    // The name of this collection.
    this.name = 'FoodMenusCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      vendor: String,
      price: Number,
      image: String,
      bio: String,
      owner: String,
      vegan: Boolean,
      drink: Boolean,
      dessert: Boolean,
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
 * The singleton instance of the FoodMenusCollection.
 * @type {FoodMenusCollection}
 */
export const FoodMenus = new FoodMenuCollection();
