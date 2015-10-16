(function(root) {
  'use strict';
  root.Browse = React.createClass({
    getInitialState: function () {
      return { drawings: DrawingsStore.all() };
    },

    _onChange: function () {
      this.setState({ drawings: DrawingsStore.all() });
    },

    componentDidMount: function () {
      DrawingsStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllDrawings(current_user_id);
    },

    render: function () {
      var drawings = this.state.drawings;
      if (drawings.length !== 0) {
        return (
          <div className="index">
            <p className="section-title">Hottest Draws</p>
            <div className="hot-drawings">
              {
                drawings.slice(0, 10).map(function (drawing) {
                  return (
                    <DrawThumbnail key={drawing.id} typeOfThumb="show-pic" drawing={drawing}/>
                  );
                })
              }
            </div>
            <p className="section-title">All Draws</p>
            <div className="all-other-drawings">
              {
                drawings.slice(10).map(function (drawing) {
                  return (
                    <DrawThumbnail key={drawing.id} typeOfThumb="show-pic" drawing={drawing}/>
                  );
                })
              }
            </div>
          </div>
        );
      } else {
        return (
          <div className="index">
            <p className="section-title">Hottest Draws</p>
            <div className="hot-drawings"></div>
            <p className="section-title">All Draws</p>
            <div className="all-other-drawings">
              <Spinner spinnerName='cube-grid fade-in'/>
            </div>
          </div>
        );
      }
    }
  });
}(this));
