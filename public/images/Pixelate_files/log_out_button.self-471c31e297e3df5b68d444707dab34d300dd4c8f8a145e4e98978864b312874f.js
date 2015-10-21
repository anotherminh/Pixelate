(function (root) {
  'use strict';
  root.LogOutButton = React.createClass({
    displayName: "LogOutButton",

    handleLogOut: function (e) {
      e.preventDefault();
      SessionUtil.LogOut();
    },

    render: function () {
      return React.createElement(
        "div",
        { className: "log-out-button", onClick: this.handleLogOut },
        "Log out"
      );
    }
  });
})(this);