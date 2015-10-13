(function(root) {
  'use strict';
  root.Swatch = React.createClass({
    handleClick: function () {
      PaletteActions.receiveNewActiveColor(this.props.color);
    },

    render: function () {
      var style = { backgroundColor: this.props.color };
      return (
        <div className="color-swatch"
             style={style}
             onClick={this.handleClick}></div>
      );
    }
  });
}(this));
