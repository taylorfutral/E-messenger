import { Meteor } from 'meteor/meteor';
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
  }

});