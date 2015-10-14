(function(root) {
  'use strict';
  root.DrawingAppButton = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function() {
      this.history.pushState(null, '/drawings/new');
    },

    render: function () {
      return (
        <div className="profile-button" onClick={this.handleClick}>
          Drawing App
        </div>
      );
    }
  });
}(this));