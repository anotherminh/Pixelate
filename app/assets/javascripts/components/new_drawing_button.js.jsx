(function(root) {
  'use strict';
  root.NewDrawingButton = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function() {
      this.history.pushState(null, 'drawings/new');
    },

    render: function () {
      return (
        <div className="new-drawing-button" onClick={this.handleClick}>
          +
          <span className="new-drawing-button-info">
            <p className="new-drawing-button-info-text">New Drawing</p>
          </span>
        </div>
      );
    }
  });
}(this));
