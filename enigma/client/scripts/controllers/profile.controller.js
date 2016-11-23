import { _ } from 'meteor/underscore';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class ProfileCtr extends Controller {
    constructor() {
	super(...arguments);
	
	const profile = this.currentUser && this.currentUser.profile;
	this.name = profile ? profile.name : '';
    }

    updatePicture() {
	MeteorCameraUI.getPicture({ width: 60, height: 60 }, (err, data) => {
	    if (err) return this.handleError(err);
	    
	    this.$ionicLoading.show({
		    template: 'Updating picture...'
	    });

	    this.callMethod('updatePicture', data, (err) => {
		    this.$ionicLoading.hide();
		    this.handleError(err);
		});
	});
}

}