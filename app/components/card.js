const CardComponent = {
  bindings: {
    data: '='
  },
  controller: function($http) {
    this.greeting = "Welcome";
    this.name = "Edward";
  },
  template: `<md-card md-theme="default" md-theme-watch>
        <md-card-title>
          <md-card-title-text>
            <span class="md-headline">Card with image</span>
            <span class="md-subhead">Small</span>
          </md-card-title-text>
          <md-card-title-media>
            <div class="md-media-sm card-media"></div>
          </md-card-title-media>
        </md-card-title>
        <md-card-actions layout="row" layout-align="end center">
          <md-button>Action 1</md-button>
          <md-button>Action 2</md-button>
        </md-card-actions>
      </md-card>`
};

export default () => {
  angular
    .module('app')
    .component('card', CardComponent);
}
