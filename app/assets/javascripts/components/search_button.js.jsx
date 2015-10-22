(function(root) {
  'use strict';
  root.SearchButton = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function() {
      this.history.pushState(null, 'search/');
    },

    render: function () {
      return (
        <div className="sidebar-button" onClick={this.handleClick}>
          Search
        </div>
      );
    }
  });
}(this));
