// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';
import { Meteor } from 'meteor/meteor';

 
export default class ChatCtrl extends Controller {
  constructor($scope) {
    super(...arguments);
 
    this.chatId = this.$stateParams.chatId;
    this.timer = 0;
    this.timerFlag = false;

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

    console.log(this.$scope.time);

    this.callMethod('newMessage', {
      text: this.message,
      type: 'text',
      chatId: this.chatId,
      userId: Meteor.userId(),
      timestamp: new Date(),
      timer: this.$scope.time
      //other user's name?
    });

    delete this.message;
  }

  // helper methods are not too necessary now
  // timerSeconds(num){
  //   this.timer = num;
  // }

  // checkTimer(isSelected){
  //   this.timerFlag = isSelected;
  // }
}

ChatCtrl,$name = 'ChatCtrl';
ChatCtrl.$inject = ['$stateParams'];