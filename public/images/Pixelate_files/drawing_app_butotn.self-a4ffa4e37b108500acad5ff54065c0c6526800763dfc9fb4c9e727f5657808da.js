(function (root) {
  'use strict';
  root.DrawingAppButton = React.createClass({
    displayName: 'DrawingAppButton',

    mixins: [ReactRouter.History],

    handleClick: function () {
      this.history.pushState(null, 'drawings/new');
    },

    render: function () {
      return React.createElement(
        'div',
        { onClick: this.handleClick },
        'New Drawing'
      );
    }
  });
})(this);