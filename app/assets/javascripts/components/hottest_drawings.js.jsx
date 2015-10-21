(function(root) {
  'use strict';
  root.HottestDrawings = React.createClass({
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
        return (
          <div>
            {
              drawings.slice(0, 8).map(function (drawing) {
                return (
                  <DrawThumbnail key={drawing.id} typeOfThumb="show-pic" drawing={drawing}/>
                );
              })
            }
          </div>
        );
      } else {
        return <Spinner spinnerName='cube-grid fade-in'/>;
      }
    }
  });
}(this));
