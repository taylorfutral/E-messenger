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
        // when you receive messages you want it to be decoded with your private key
        // c = Chats.findOne(this.chatId);
        // curr_user_key = "";
        // other_user_key = "";
        // if(c.user1_key == Meteor.userId()){
        //   curr_user_key = c.user1_key;
        //   other_user_key = c.user2_key;
        // }else{
        //   curr_user_key = c.user2_key;
        //   other_user_key = c.user1_key;
        // }



        m = Messages.find({ chatId: this.chatId });
        // m.forEach(function(data){
        //   if(data.userId == Meteor.userId()){
        //     decrypted = CryptoJS.AES.decrypt(data.encrypted_message, other_user_key);
        //     decrypted_message = decrypted.toString(CryptoJS.enc.Utf8);
        //   }else{
        //     decrypted = CryptoJS.AES.decrypt(data.encrypted_message, curr_user_key);
        //     decrypted_message = decrypted.toString(CryptoJS.enc.Utf8);
        //   }
        //   Messages.update(data._id, { $set: 
        //     { decrypted_message: decrypted_message },
        //   });
        // });




      	return m;
      },
      data() {
        return Chats.findOne(this.chatId);
      }
    });
  }


  sendMessage(){
    if(_.isEmpty(this.message)) return;

    current_chat = Chats.findOne(this.chatId);
    other_user_key = "";
    if(current_chat.name1 == Meteor.user().username){
      other_user_key = current_chat.user2_key;
    }else{
      other_user_key = current_chat.user1_key;
    }
    console.log(other_user_key)
    encrypted = CryptoJS.AES.encrypt(this.message, other_user_key)  ;
    console.log(encrypted);
    this.callMethod('newMessage', {
      text: this.message,
      encrypted_message: encrypted.toString(),
      decrypted_message: "",
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
      //FIXME: delete the last message from chat as well
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
