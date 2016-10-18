import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../lib/collections';
 
Meteor.methods({
  newMessage(message) {
    message.timestamp = new Date();
 
    const messageId = Messages.insert(message);
    //FIXME, Chats.update is not working for users when using 'meteor mongo' on commmand line
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  }
});