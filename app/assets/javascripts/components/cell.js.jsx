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
      var style = { backgroundColor: "white" };
      if (this.state.active) { style.backgroundColor = "black"; }

      var cell = this.props.cell;
      return (
        <div className="cell"
             style={style}
             idx={cell.id}
             onMouseDown={this.handleMouseDown}
             onMouseUp={this.handleMouseUp}
             onMouseOver={this.mouseOver}>
        </div>
      );
    }
  });
}(this));
