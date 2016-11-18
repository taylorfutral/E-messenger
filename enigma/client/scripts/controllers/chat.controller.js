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
        //when you receive messages you want it to be decoded with your private key

        // need c, d, N
        other_user = Messages.findOne({userId: {$ne: Meteor.userId()}, chatId: this.chatId});
        console.log(other_user);
        console.log(Meteor.userId());
        console.log(Meteor.user().profile);
        user_d = Meteor.user().profile.privateKey[0];
        user_N = Meteor.user().profile.publicKey[0];
        console.log(user_d);
        console.log(user_N)
        if (other_user != null){
          other_user_d = Chats.findOne({ _id: other_user._id }).privateKey[0];
          other_user_N = Chats.findOne({ _id: other_user._id }).publicKey[0]
        }

        mine = [];
        not_mine = [];

        m = Messages.find({chatId: this.chatId});

        m.forEach(function(item){
          if (item.userId != Meteor.userId()){
            not_mine.push(item);
            // char_arr = this.decrypt_message(item.encrypted_message, other_user_d, other_user_N);
          }else{
            mine.push(item);
            // char_arr = this.decrypt_message(item.encrypted_message, user_d, user_N);
          }
        });
        console.log(mine);
        console.log(not_mine);

        for (i = 0; i < mine.length; i++){
          console.log(mine[i].encrypted_message)
          char_arr = this.decrypt_message(mine[i].encrypted_message, user_d, user_N);
          console.log(char_arr);
        }







      	return Messages.find({ chatId: this.chatId });
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });
  }


  sendMessage(){
    if(_.isEmpty(this.message)) return;

    // when you send a message, you want it to be encoded with the sendee's public key
    sendee = Chats.findOne(this.chatId);
    console.log(sendee);
    // a list where the first element is N and the second element is e
    sendee_public_key= sendee.publicKey;
    console.log(sendee_public_key);
    arr = this.convert_message_to_numarr(this.message);
    encrypted_arr = this.encrypt_array(arr, sendee_public_key[0], sendee_public_key[1]);
    console.log(encrypted_arr);

    this.callMethod('newMessage', {
      text: this.message,
      encrypted_message: encrypted_arr,
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


  // helper functions for encryption
  convert_message_to_numarr(message){
    arr = []
    for(i = 0; i < message.length; i++){
      arr.push(message.charCodeAt(i));
    }
    return arr;
    // String.fromCharCode(num); is the inverse
  }

  conver_numarr_to_message(arr){
    arr = []
    for(i = 0; i < arr.length; i++){
      arr.push(String.fromCharCode(arr[i]));
    }
    return arr;
    // String.fromCharCode(num); is the inverse
  }

  encrypt_array(array, N, e){
    arr = [];
    for (var i = 0; i < array.length; i++){
      arr.push(this.encrypt_num(N, e, array[i]));
    }
    return arr;
  }

  decrypt_message(array, d, N){
    arr = []
    for(i=0; i < array.length; i++){
      arr.push(this.decrypt_num(arr[i], d, N));
    }
    return arr;
  }

  encrypt_num(N, e, M) {

    var r, i=0, prod=1, rem_mod=0;

    while (e>0) {
      r = e % 2;

      if (i++==0) {
        rem_mod=M % N;
      }
      else{
        rem_mod=this.power(rem_mod,2) % N;
      }
      if (r==1){
        prod*=rem_mod;
        prod=prod % N;
      }
      e=parseInt(e/2);
    }
    return prod;
  }

  decrypt_num(c, d, N){
    var r, i=0, prod=1, rem_mod=0;

    while (d>0){
      r=d % 2;
      if (i++==0){
        rem_mod=c % N;
      }
      else
        rem_mod=this.power(rem_mod,2) % N;
      if (r==1){
        prod*=rem_mod;
        prod=prod % N;
      }
      d=parseInt(d/2);
    }
    return prod;
  }

  power(a, b){
    var temp=1, i;

    for(i=1;i<=b;i++) {
      temp*=a;
    }
    return temp;
  }

}

ChatCtrl,$name = 'ChatCtrl';
ChatCtrl.$inject = ['$stateParams'];