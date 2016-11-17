// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats, Messages } from '../../../lib/collections';
import { Meteor } from 'meteor/meteor';

 
export default class ChatCtrl extends Controller {
  constructor($scope) {
    super(...arguments);
 
    this.chatId = this.$stateParams.chatId;

    $scope.userId = Meteor.userId();

    this.helpers({
      messages(){
        m = Messages.find({chatId: this.chatId});
        mine = [];
        not_mine = [];
        m.forEach(function(item){
          if (item.userId == Meteor.userId()){
            mine.push(item);
          }else{
            not_mine.push(item);
          }
        });

        console.log(mine);
        console.log(not_mine);


      	return Messages.find({ chatId: this.chatId });
      },
      print_message(){
        // first find out who's message it is
        // then find the correct userID
        // then return the string decrypted with the correct private key
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });
  }

  sendMessage(){
    if(_.isEmpty(this.message)) return;

    //FIXME: Going to need to convert this.message into an encrypted message
    arr = this.convert_message_to_numarr(this.message);


    this.callMethod('newMessage', {
      text: this.message,
      // encrypted_message: null,
      type: 'text',
      chatId: this.chatId,
      userId: Meteor.userId(),
      timestamp: new Date(),
      timer: this.$scope.timer
      //other user's name?
    });

    delete this.message;
  }

  is_delete(message){
    return message.timer > 0;
  }

  delayed_delete(message){
    var time = message.timer * 1000;
    Meteor.setTimeout(function() {
      Messages.remove({ _id: message._id });
    }, time);

  }

  convert_message_to_numarr(message){
    arr = []
    for(i = 0; i < message.length; i++){
      arr.push(message.charCodeAt(i));
    }
    // String.fromCharCode(num); is the inverse
  }

}

ChatCtrl,$name = 'ChatCtrl';
ChatCtrl.$inject = ['$stateParams'];