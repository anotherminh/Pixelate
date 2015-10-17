(function(root) {
  'use strict';
  root.SearchButton = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function() {
      console.log("profile clicked");
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
