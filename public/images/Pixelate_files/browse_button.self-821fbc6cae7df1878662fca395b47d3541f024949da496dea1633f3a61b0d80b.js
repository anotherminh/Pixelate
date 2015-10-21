(function (root) {
  'use strict';
  root.BrowseButton = React.createClass({
    displayName: 'BrowseButton',

    mixins: [ReactRouter.History],

    handleClick: function () {
      console.log("profile clicked");
      this.history.pushState(null, 'users/');
    },

    render: function () {
      return React.createElement(
        'div',
        { className: 'sidebar-button', onClick: this.handleClick },
        'Browse'
      );
    }
  });
})(this);