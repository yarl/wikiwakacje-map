const CardComponent = {
  bindings: {
    data: '='
  },
  controller: function($http) {
  },
  template: `<md-card md-theme="default" md-theme-watch>
        <md-card-title>
          <md-card-title-text>
            <span class="md-headline">{{$ctrl.data.name}}</span>
            <span class="md-subhead">{{$ctrl.data.address}}</span>
          </md-card-title-text>
          <md-card-title-media>
            <div class="md-media-sm card-media"
                 layout="row" layout-align="center center"
                 ng-if="$ctrl.data.image">
              <img class="card-photo" ng-src="http://commons.wikimedia.org/w/thumb.php?f={{$ctrl.data.image}}&w=200"/>
            </div>
          </md-card-title-media>
        </md-card-title>
        <md-card-actions layout="row" layout-align="end center">
          <md-button>Więcej informacji</md-button>
          <md-button>Prześlij</md-button>
        </md-card-actions>
      </md-card>`
};

export default () => {
  angular
    .module('app')
    .component('card', CardComponent);
}
