(function (root) {
  'use strict';
  var _colors = ['#FF0000', '#6495ED', '#228B22', '#F5DEB3', '#D2691E', '#FFFFFF', '#000000', '#FFC0CB', '#800080'];

  root.Palette = React.createClass({
    displayName: 'Palette',

    render: function () {
      return React.createElement(
        'div',
        { className: 'palette' },
        _colors.map(function (color, idx) {
          return React.createElement(ColorPicker, { key: idx, defaultColor: color });
        })
      );
    }
  });
})(this);