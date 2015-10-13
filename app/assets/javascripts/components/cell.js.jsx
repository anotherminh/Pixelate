(function(root) {
  'use strict';
  root.Cell = React.createClass({
    getInitialState: function() {
      return { active: false };
    },

    handleMouseDown: function () {
      this.setState({ active: true});
      this.props.toggleClick();
    },

    handleMouseUp: function () {
      this.props.toggleClick();
    },

    mouseOver: function(e) {
      if (this.props.mouseDown) {
        this.setState({active: true});
      }
    },

    render: function () {
      var cell = this.props.cell;

      if (this.state.active) {
        this.props.cell.style.backgroundColor = "black";
        CellsActions.updateCellsStore(cell);
      }

      return (
        <div className="cell"
             style={cell.style}
             idx={cell.id}
             onMouseDown={this.handleMouseDown}
             onMouseUp={this.handleMouseUp}
             onMouseOver={this.mouseOver}>
        </div>
      );
    }
  });
}(this));
