(function (root) {
  'use strict';
  root.Canvas = React.createClass({
    displayName: "Canvas",

    getInitialState: function () {
      return { mouseDown: false };
    },

    handleMouseUp: function () {
      this.setState({ mouseDown: false });
    },

    handleMouseDown: function () {
      this.setState({ mouseDown: true });
    },

    handleLeavingCanvas: function () {
      this.setState({ mouseDown: false });
    },

    render: function () {
      var that = this;
      var canvas = that.props.drawing;
      var style = { width: canvas.size * 10 + canvas.size * 2 };
      var cells = canvas.content;
      return React.createElement(
        "div",
        { className: "canvas",
          id: "save-me",
          style: style,
          onClick: this.props.paintbucket,
          onMouseLeave: that.handleLeavingCanvas },
        cells.map(function (cell, idx) {
          return React.createElement(Cell, { key: cell.id,
            idx: idx,
            cell: cell,
            paintbucketOn: that.props.paintbucketOn,
            handleMouseDown: that.handleMouseDown,
            handleMouseUp: that.handleMouseUp,
            mouseDown: that.state.mouseDown,
            handleHover: that.handleHover });
        })
      );
    }
  });
})(this);