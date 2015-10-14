(function(root) {
  'use strict';
  root.Cell = React.createClass({
    getInitialState: function() {
      return { active: 0 };
    },

    handleMouseDown: function () {
      this.setState({ active: 1 });
      this.props.handleMouseDown();
    },

    handleMouseUp: function () {
      this.props.handleMouseUp();
    },

    mouseOver: function(e) {
      if (this.props.mouseDown) {
        this.setState({active: 1});
      }
    },

    render: function () {
      var cell = this.props.cell;

      if (this.state.active === 1) {
        this.props.cell.style.backgroundColor = ColorStore.get();
        this.state.active++; //updates to 2
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
