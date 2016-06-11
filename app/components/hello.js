import style from './hello.scss';

export default () => {
  const HelloComponent = {
    bindings: {},
    controller: function($http) {
      this.greeting = "Welcome";
      this.name = "Edward";
    },
    template: `<h3 class="header">{{$ctrl.greeting}} dear <strong>{{$ctrl.name}}</strong>!</h3>`
  };

  angular
    .module('app')
    .component('hello', HelloComponent);
}
