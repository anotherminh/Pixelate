(function(root) {
  'use strict';
  var LinkedStateMixin = React.addons.LinkedStateMixin;

  root.ColorPicker = React.createClass({
    getInitialState: function () {
      return { color: this.props.defaultColor };
    },

    _onChange: function (e) {
      var newColor = e.target.value;
      this.setState(
        { color: newColor },
        PaletteActions.receiveNewActiveColor(this.state.color));
      },

    render: function () {
      var style = { "backgroundColor": this.state.color };
      return (
        <label onClick={this.handleClick} className="stylized-color-picker" style={style}>
          <input id="color-picker"
                 type="color"
                 onChange={this._onChange}
                 onClick={this._onChange}
                 value={this.state.color}/>
        </label>
      );
    }
  });
}(this));
