// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';
 
export default class ChatCtrl extends Controller {
  constructor() {
    super(...arguments);
 
    this.chatId = this.$stateParams.chatId;
 
    this.helpers({
      messages(){
      	return Messages.find({ chatId: this.chatId });
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });
  }
  sendMessage(){
    if(_.isEmpty(this.message)) return;
    
    this.callMethod('newMessage', {
      text: this.message,
      type: 'text',
      chatId: this.chatId
    });

    delete this.message;
  }
}

ChatCtrl.$inject = ['$stateParams'];