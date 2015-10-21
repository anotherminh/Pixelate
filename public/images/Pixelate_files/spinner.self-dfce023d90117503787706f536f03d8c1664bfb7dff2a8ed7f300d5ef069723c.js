(function (root) {
  'use strict';
  root.Spinner = React.createClass({
    displayName: "Spinner",

    render: function () {
      return React.createElement(
        "div",
        { className: "cube-grid" },
        React.createElement("div", { className: "cube" }),
        React.createElement("div", { className: "cube" }),
        React.createElement("div", { className: "cube" }),
        React.createElement("div", { className: "cube" }),
        React.createElement("div", { className: "cube" }),
        React.createElement("div", { className: "cube" }),
        React.createElement("div", { className: "cube" }),
        React.createElement("div", { className: "cube" }),
        React.createElement("div", { className: "cube" })
      );
    }
  });
})(this);