import $ from 'jquery';

const SidebarComponent = {
  bindings: {
    cards: '=',
    highlight: '=',
    loading: '='
  },
  controller: function($scope) {
    var vm = this;
    var cardContainer = $('.ww-cards');

    $scope.$watch(() => vm.highlight, function (id) {
      if(!id) return;
      var myElement = document.querySelector('card[data-id="'+id+'"]');
      cardContainer.animate({scrollTop: myElement.offsetTop-6}, "quick");
    });

  },
  template: `<div class="ww-sidebar"
                   layout="column"
                   layout-align="start center">
       <div class="ww-cards-loading"
            layout="column"
            layout-align="center center"
            ng-show="$ctrl.loading.active">
          <md-progress-circular md-mode="indeterminate"
                             md-diameter="60"></md-progress-circular>
       </div>
      <div class="ww-cards">
        <card class="ww-card-container"
              ng-repeat="card in $ctrl.cards"
              ng-class="$ctrl.highlight === card.id ? 'ww-card-active' : 'ww-card-inactive'"
              data-id="{{card.id}}"
              data="card"></card>
      </div>
      <md-list class="ww-sidebar-options">
        <md-list-item>
          <p>Szukaj podczas przesuwania mapy</p>
          <md-switch ng-model="$ctrl.loading.dragSearch" aria-label="Switch 1"></md-switch>
        </md-list-item>
      </md-list>
    </div>`
};

export default () => {
  angular
    .module('app')
    .component('wwSidebar', SidebarComponent);
}
