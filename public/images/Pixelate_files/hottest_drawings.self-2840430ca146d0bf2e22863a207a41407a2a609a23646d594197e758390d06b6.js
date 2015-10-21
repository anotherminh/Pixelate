(function (root) {
  'use strict';
  root.HottestDrawings = React.createClass({
    displayName: 'HottestDrawings',

    getInitialState: function () {
      return { drawings: DrawingsStore.allHotDrawings() };
    },

    _onChange: function () {
      this.setState({ drawings: DrawingsStore.allHotDrawings() });
    },

    componentDidMount: function () {
      DrawingsStore.addHotDrawsChangeListener(this._onChange);
      ApiUtil.fetchBestDrawings();
    },

    componentWillUnmount: function () {
      DrawingsStore.removeHotDrawsChangeListener(this._onChange);
    },

    render: function () {
      var drawings = this.state.drawings;
      if (drawings.length > 0) {
        return React.createElement(
          'div',
          null,
          drawings.slice(0, 8).map(function (drawing) {
            return React.createElement(DrawThumbnail, { key: drawing.id, typeOfThumb: 'show-pic', drawing: drawing });
          })
        );
      } else {
        return React.createElement(Spinner, { spinnerName: 'cube-grid fade-in' });
      }
    }
  });
})(this);