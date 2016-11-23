// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import 'angular-animate';
import 'angular-meteor';
import 'angular-meteor-auth';
import 'angular-moment';
import 'angular-sanitize';
import 'angular-ui-router';
import 'ionic-scripts';
import Angular from 'angular';
import Loader from 'angular-ecmascript/module-loader'
import { Meteor } from 'meteor/meteor';
 
import ChatsCtrl from '../controllers/chats.controller';
import ChatCtrl from '../controllers/chat.controller';
import InputDirective from '../directives/input.directive';
import CalendarFilter from '../filters/calendar.filter';
import LoginCtrl from '../controllers/login.controller';
import SettingsCtrl from '../controllers/settings.controller';
import SearchCtrl from '../controllers/search.controller';
import Routes from '../routes';
 
const App = 'ENIGMA';
 
Angular.module(App, [
    'angular-meteor',
    'angular-meteor.auth',
    'angularMoment',
    'ionic'
]);

new Loader(App)
	.load(ChatsCtrl)
	.load(ChatCtrl)
  .load(InputDirective)
  .load(LoginCtrl)
  .load(SettingsCtrl)
  .load(SearchCtrl)
	.load(CalendarFilter)
	.load(Routes);

if (Meteor.isCordova) {
  Angular.element(document).on('deviceready', onReady);
}
else {
  Angular.element(document).ready(onReady);
}
 
function onReady() {
  Angular.bootstrap(document, [App]);
}