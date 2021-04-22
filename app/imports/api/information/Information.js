import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The StuffsCollection. It encapsulates state and variable values for stuff.
 */
class InformationCollection {
  constructor() {
    // The name of this collection.
    this.name = 'InformationCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      image: { type: String,
        defaultValue: 'https://react.semantic-ui.com/images/wireframe/image.png',
      },
      firstname: { type: String,
        defaultValue: 'None',
      },
      lastname: { type: String,
        defaultValue: 'None',
      },
      owner: String,
      favoriteVendor: { type: String,
        defaultValue: 'None',
      },
      favoriteItem: { type: String,
        defaultValue: 'None',
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    // this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {StuffsCollection}
 */
export const Information = new InformationCollection();
