import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesPreferences } from '../../api/profiles/ProfilesPreferences';

const updateProfileMethod = 'Profiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilePreferencess, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.update'({ name, price, bio, picture, preferences }) {
    Profiles.collection.update({ name }, { $set: { name, price, bio, picture, preferences } });
    ProfilesPreferences.collection.remove({ profile: name });
    preferences.map((pref) => ProfilesPreferences.collection.insert({ profile: name, pref }));
  },
});

export { updateProfileMethod };