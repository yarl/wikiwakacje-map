//import './hello.scss';

const HelloComponent = {
  bindings: {},
  controller: function($http) {
    this.greeting = "Welcome";
    this.name = "Edward";
  },
  template: `<h3 class="header">{{$ctrl.greeting}} dear <strong>{{$ctrl.name}}</strong>!</h3>`
};

export default () => {
  angular
    .module('app')
    .component('hello', HelloComponent);
}
