(function (root) {
  'use strict';
  root.MoreDrawingButton = React.createClass({
    displayName: "MoreDrawingButton",

    mixins: [ReactRouter.History],

    handleClick: function () {
      var url = "/drawing_details/" + this.props.drawingId;
      this.history.pushState(null, url);
    },

    render: function () {
      var max_drawings = DrawingsStore.all().count;
      if (max_drawings >= this.props.drawingId || this.props.drawingId >= 1) {
        var content,
            klass = "more-drawing-button";
        if (this.props.name === "Previous") {
          content = "<";
          klass += " left";
        } else {
          content = ">";
          klass += " right";
        }

        return React.createElement(
          "div",
          { className: klass, onClick: this.handleClick },
          content
        );
      } else {
        return React.createElement("div", null);
      }
    }
  });
})(this);