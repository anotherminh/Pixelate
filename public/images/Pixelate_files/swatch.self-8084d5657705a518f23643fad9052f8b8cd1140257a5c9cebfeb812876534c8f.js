(function (root) {
  'use strict';
  root.Swatch = React.createClass({
    displayName: "Swatch",

    handleClick: function () {
      PaletteActions.receiveNewActiveColor(this.props.color);
    },

    render: function () {
      var style = { backgroundColor: this.props.color };
      return React.createElement("div", { className: "color-swatch",
        style: style,
        onClick: this.handleClick });
    }
  });
})(this);