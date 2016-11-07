import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';


export default class SearchCtrl extends Controller {
    constructor($scope) {
        super(...arguments);
        this.results = [];
    }
    findUsers() {
        if (_.isEmpty(this.query)) return;
        
        var response = this.callMethod('userSearch', this.query);
        this.results = response;
        console.log(this.results);
    }
}

SearchCtrl.$name = 'SearchCtrl';
SearchCtrl.$inject = ['$state', '$meteor'];