(function(root) {
  'use strict';
  root.BrowseButton = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function() {
      console.log("profile clicked");
      this.history.pushState(null, 'users/');
    },

    render: function () {
      return (
        <div className="sidebar-button" onClick={this.handleClick}>
          Browse
        </div>
      );
    }
  });
}(this));
