// code adapted from: https://www.angular-meteor.com/tutorials/whatsapp/

import { Directive } from 'angular-ecmascript/module-helpers';
 
export default class InputDirective extends Directive {
  constructor() {
    super(...arguments);
 
    this.restrict = 'E';
 
    this.scope = {
      'returnClose': '=',
      'onReturn': '&'
    };
  }
 
  link(scope, element) {
    element.bind('keydown', (e) => {
      if (e.which != 13) return;
 
      if (scope.returnClose) {
        element[0].blur();
      }
 
      if (scope.onReturn) {
        this.$timeout(() => {
          scope.onReturn();
        });
      }
    });
  }
}
 
InputDirective.$name = 'input';
InputDirective.$inject = ['$timeout'];
