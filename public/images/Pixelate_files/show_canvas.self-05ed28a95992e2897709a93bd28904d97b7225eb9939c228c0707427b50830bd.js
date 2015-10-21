(function (root) {
  'use strict';
  root.ShowCanvas = React.createClass({
    displayName: "ShowCanvas",

    getInitialState: function () {
      return { mouseDown: false };
    },

    render: function () {
      var that = this;
      var canvas = that.props.drawing;
      var style = { width: canvas.size * 10 + canvas.size * 2 };
      var cells = canvas.content;

      return React.createElement(
        "div",
        { className: "canvas",
          style: style },
        cells.map(function (cell) {
          return React.createElement("div", { className: "show-cell",
            style: cell.style,
            key: cell.id });
        })
      );
    }
  });
})(this);