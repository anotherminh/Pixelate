(function (root) {
  'use strict';
  root.ProfileButton = React.createClass({
    displayName: 'ProfileButton',

    mixins: [ReactRouter.History],

    handleClick: function () {
      console.log("profile clicked");
      this.history.pushState(null, 'users/' + root.current_user_id);
    },

    render: function () {
      return React.createElement(
        'div',
        { className: 'sidebar-button', onClick: this.handleClick },
        'Profile'
      );
    }
  });
})(this);