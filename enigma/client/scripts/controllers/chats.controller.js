// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';
 
export default class ChatsCtrl extends Controller {
  constructor() {
    super(...arguments);
 
    this.helpers({
      getChats() {
        current_user = Meteor.user().username;
        return Chats.find({ $or: [ { name1: current_user }, 
                                   { name2: current_user }]});
      }
    });
  }

  return_name(chat){
    return chat.name1 == Meteor.user().username ? chat.name2 : chat.name1;
  }
 
  return_picture(chat){
    return chat.name1 == Meteor.user().username ? chat.user2_picture : chat.user1_picture;
  }

  remove(chat) {
    Chats.remove(chat._id);
  }

}