import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats, Messages } from '../lib/collections';
 
Meteor.methods({
  newMessage(message) {
 
    const messageId = Messages.insert(message);
    //FIXME, Chats.update is not working for users when using 'meteor mongo' on commmand line
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },

  updatePicture(data) {
      if(!this.userId){
	  throw new Meteor.Error('not-logged-in',
				 'Must be logged in to update his picture.');
      }

      check(data, String);

      return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  },
    updateName(name) {
        if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
                'Must be logged in to update his name.');
        }

        check(name, String);

        if (name.length === 0) {
            throw Meteor.Error('name-required', 'Must provide a user name');
        }

        return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
    },
  userSearch(queryString) {
    //simple search for users, currently searches usernames
    var query = {
      $where: "this.username.includes('"+queryString+"')"
    };
    var fields = { //limits what the search will return
      username: 1,
      emails: 1,
      profile: 1
    };
    
    var results = Meteor.users.find(query, {'fields': fields});
    return results.fetch();
  }

});