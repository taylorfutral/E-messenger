// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { Config } from 'angular-ecmascript/module-helpers';
 
export default class RoutesConfig extends Config {
  configure() {
    this.$stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'client/templates/tabs.html'
      })
      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'client/templates/chats.html',
            controller: 'ChatsCtrl as chats'
          }
        }
      })
      .state('tab.chat', {
        url: '/chats/:chatId',
        views: {
          'tab-chats' : {
            templateUrl: 'client/templates/chat.html',
            controller: 'ChatCtrl as chat'
          }
        }
      });
 
    //Reroutes user to tab/chats
    this.$urlRouterProvider.otherwise('tab/chats');
  }
}
 
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];