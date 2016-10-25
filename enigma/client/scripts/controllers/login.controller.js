// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

//Account Configuration
Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY',
});

//Login Controller class
export default class LoginCtrl extends Controller {
    login(){
        console.log("login fn called");
        console.log("this.phone: " + this.phone)
    }
}

LoginCtrl.$name = 'LoginCtrl';