(function(root) {
  'use strict';
  root.Cell = React.createClass({
    render: function () {
      var cell = this.props.cell;
      return (
        <div className="cell"
             style={cell.style}
             idx={cell.id}>
        </div>
      );
    }
  });
}(this));
