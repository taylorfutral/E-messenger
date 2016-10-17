// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { Mongo } from 'meteor/mongo';
 
export const Chats = new Mongo.Collection('chats');
export const Messages = new Mongo.Collection('messages');