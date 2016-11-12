// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Config, Runner } from 'angular-ecmascript/module-helpers';
 
export default class RoutesConfig extends Config {
    constructor() {
        super(...arguments);

        this.isAuthorized = ['$auth', this.isAuthorized.bind(this)];
    }
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
      })
        .state('login', {
            url: '/login',
            templateUrl: 'client/templates/login.html',
            controller: 'LoginCtrl as logger'
        })
        .state('tab.settings',{
            url: '/settings',
            views: {
                'tab-settings': {
                    templateUrl: 'client/templates/settings.html',
                    controller: 'SettingsCtrl as settings',
                }
            }
        });

    //Reroutes user to tab/chats
    this.$urlRouterProvider.otherwise('tab/chats');
  }
    isAuthorized($auth) {
        return $auth.awaitUser();
    }
}
 
RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

class RoutesRunner extends Runner {
    run() {
        this.$rootScope.$on('$stateChangeError', (...args) => {
            const err = _.last(args);

            if (err === 'AUTH_REQUIRED') {
                this.$state.go('login');
            }
        });
    }
}

RoutesRunner.$inject = ['$rootScope', '$state'];

export default [RoutesConfig, RoutesRunner];
