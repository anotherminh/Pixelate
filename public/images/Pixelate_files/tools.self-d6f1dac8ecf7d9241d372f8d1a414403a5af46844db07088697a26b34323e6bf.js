(function (root) {
  'use strict';
  var tools = ["brush", "eraser", "paintbucket", "save"];
  root.Tools = React.createClass({
    displayName: "Tools",

    render: function () {
      var that = this;
      return React.createElement(
        "div",
        { className: "tools-container" },
        tools.map(function (toolType, idx) {
          return React.createElement(Tool, { key: idx, toolType: toolType, handleToolSelection: that.props.handleToolSelection });
        })
      );
    }
  });
})(this);