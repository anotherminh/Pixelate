(function(root) {
  'use strict';

  root.ColorPicker = React.createClass({
    getInitialState: function () {
      return { color: this.props.defaultColor };
    },

    _onChange: function (e) {
      var newColor = e.target.value;
      this.props.resetCursor();
      this.setState(
        { color: newColor },
        PaletteActions.receiveNewActiveColor(newColor));
      },

    render: function () {
      var style = { "backgroundColor": this.state.color };
      return (
        <label onClick={this.handleClick} className="stylized-color-picker" style={style}>
          <input id="color-picker"
                 type="color"
                 onInput={this._onChange}
                 onClick={this._onChange}
                 value={this.state.color}/>
        </label>
      );
    }
  });
}(this));
