// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/
import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

//Account Configuration
Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY',
});

//Login Controller class
export default class LoginCtrl extends Controller {
    login(){ //Login in existing user account
        if(_.isEmpty(this.email) || _.isEmpty(this.password)) return;
        console.log("login fn called");
        console.log("this.email: " + this.email);
        console.log("this.password: " + this.password);
        Meteor.loginWithPassword(this.email, this.password);

        console.log("Meteor.user: " + Meteor.user());
        //redirect to tab/chats
        this.$state.go('tab.chats');
    }
    register(){ //Create new user account
        if(_.isEmpty(this.email) || _.isEmpty(this.password)) return;
        console.log("register fn called");
        console.log("this.email: " + this.email);
        console.log("this.password: " + this.password);
        Accounts.createUser({
            username: this.email,
            email: this.email,
            password: this.password,
            profile: {
                createdOn: new Date()
            }
        });
        console.log("Meteor.user: " + Meteor.user());
        //redirect to profile page
        //this.$state.go('profile');
    }
}

LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$meteor'];