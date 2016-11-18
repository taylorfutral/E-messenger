import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';
import { Chats } from '../../../lib/collections';

export default class SearchCtrl extends Controller {
    constructor($scope, $window) {
        super(...arguments);
        this.results = [];
        this.$scope = $scope;
    }
    findUsers() {
        if (_.isEmpty(this.query)) return;
        
        var self = this;
        
        Meteor.call('userSearch', this.query, function(error, response) {
            if (error) {
                throw "ERROR: Search utility cannot access server"
            } else {
                self.results.length = 0; //clear array without re-assignment
                for (row in response) {
                    self.results.push(response[row]);
                }
            }
            self.$scope.$apply(); //force view update
        });
    }
    add_user(user){
        Chats.insert({
            name: user.username,
            picture: user.profile.picture,
            publicKey: user.profile.publicKey
        });
        this.$state.go('tab.chats');
    }
}

SearchCtrl.$name = 'SearchCtrl';
SearchCtrl.$inject = ['$state', '$meteor'];