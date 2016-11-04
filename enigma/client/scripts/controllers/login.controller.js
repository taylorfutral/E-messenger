// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/
import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

//Account Configuration - will be removed
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
        Meteor.loginWithPassword(this.email, this.password,
            function(err){
                if(err){//failure
                    console.log(err.reason);
                } else {//success
                }
            }
        );
        setTimeout(function() {
            console.log("Meteor.user: " + Meteor.user());
            }, 1000);
        //redirect to tab/chats
        //this.$state.go('tab.chats');
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
            createdAt: new Date(),
            profile: {
                name: ''
            }
        }, function(err){
            if(err){//failure
                console.log(err.reason);
            } else {//success
            }
        });
        console.log("Meteor.user: " + Meteor.user());
        //redirect to profile page
        //this.$state.go('profile');
    }
    checkUser(){ console.log(Meteor.user()); }
}

LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$meteor'];
