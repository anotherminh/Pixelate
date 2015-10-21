(function (root) {
  'use strict';
  root.SearchButton = React.createClass({
    displayName: 'SearchButton',

    mixins: [ReactRouter.History],

    handleClick: function () {
      console.log("profile clicked");
      this.history.pushState(null, 'search/');
    },

    render: function () {
      return React.createElement(
        'div',
        { className: 'sidebar-button', onClick: this.handleClick },
        'Search'
      );
    }
  });
})(this);