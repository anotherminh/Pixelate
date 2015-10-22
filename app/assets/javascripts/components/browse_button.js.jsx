(function(root) {
  'use strict';
  root.BrowseButton = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function() {
      this.history.pushState(null, 'browse/1');
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
