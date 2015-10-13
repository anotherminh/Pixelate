(function(root) {
  'use strict';
  root.LogOutButton = React.createClass({
    handleLogOut: function(e) {
      e.preventDefault();
      SessionUtil.LogOut();
    },

    render: function () {
      return <button onClick={this.handleLogOut}>Log out</button>;
    }
  });
}(this));
