import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../lib/collections';
 
Meteor.methods({
  newMessage(message) {
 
    const messageId = Messages.insert(message);
    //FIXME, Chats.update is not working for users when using 'meteor mongo' on commmand line
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
  userSearch(queryString) {
    //simple search for users, currently searches usernames
    var query = {
      $where: function() {
        return (this.username.includes(queryString));
      }     
    };
    var projection = { //limits what the search will return
      username: 1,
      emails: 1,
      createdAt: 0,
      profile: 1,
      services: 0
    };
    
    var results = Meteor.users.find(/*query, projection*/); 
    return results.fetch();
  }
});