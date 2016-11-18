import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';


export default class SearchCtrl extends Controller {
    constructor($scope) {
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
}

SearchCtrl.$name = 'SearchCtrl';
SearchCtrl.$inject = ['$state', '$meteor'];