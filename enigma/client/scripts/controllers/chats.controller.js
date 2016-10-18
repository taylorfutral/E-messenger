// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';
 
export default class ChatsCtrl extends Controller {
  constructor() {
    super(...arguments);
 
    this.helpers({
      getChats() {
        return Chats.find();
      }
    });
  }
 
  remove(chat) {
    Chats.remove(chat._id);
  }
}