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
            (err) => {
                if (err) {
                    console.log(err.reason);
                    return this.handleError(err);
                }
            }
        );
        //redirect to tab/chats
        //this.$state.go('tab.chats');
    }
    register(){ //Create new user account
        if(_.isEmpty(this.email) || _.isEmpty(this.password)) return;
        Accounts.createUser({
            username: this.email,
            email: this.email,
            password: this.password,
            createdAt: new Date(),
            profile: {
                name: '',
                picture: ''
            }
        }, (err) => {
            if(err){//failure
                return this.handleError(err);
            } else {//success
            }
        });
        //redirect to profile page
        //this.$state.go('profile');
    }
    handleError(err){
        this.$log.error('Login error ', err);

        this.$ionicPopup.alert({
            title: err.reason || 'Login failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
}

LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
