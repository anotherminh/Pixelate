(function(root) {
  'use strict';
  root.ProfileButton = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function() {
      this.history.pushState(null, 'users/' + root.current_user_id);
    },

    render: function () {
      return (
        <div className="sidebar-button" onClick={this.handleClick}>
          Profile
        </div>
      );
    }
  });
}(this));
