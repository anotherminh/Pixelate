(function(root) {
  'use strict';
  root.LogOutButton = React.createClass({
    handleLogOut: function(e) {
      e.preventDefault();
      SessionUtil.LogOut();
    },

    render: function () {
      return (
        <div className="log-out-button" onClick={this.handleLogOut}>
          Log out
        </div>
      );
    }
  });
}(this));
