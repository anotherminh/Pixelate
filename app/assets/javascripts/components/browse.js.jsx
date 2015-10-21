(function(root) {
  'use strict';
  root.Browse = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { drawings: DrawingsStore.all(), hottestDrawings: DrawingsStore.allHotDrawings() };
    },

    _onChange: function () {
      this.setState({ drawings: DrawingsStore.all(), hottestDrawings: DrawingsStore.allHotDrawings() });
    },

    componentWillUnmount: function () {
      DrawingsStore.removeChangeListener(this._onChange);
    },

    handlePageClick: function (e) {
      this.history.pushState(null, 'browse/' + e.currentTarget.innerHTML);
    },

    componentWillReceiveProps: function (newProps) {
      ApiUtil.fetchBrowsePage(newProps.params.id);
    },

    componentDidMount: function () {
      DrawingsStore.addChangeListener(this._onChange);
      ApiUtil.fetchBrowsePage(1);
      ApiUtil.fetchBestDrawings();
    },

    render: function () {
      var drawings = this.state.drawings;
      if (drawings.length > 0) {
        return (
          <div className="index">
            <p className="section-title">Hottest Draws</p>
            <div className="hot-drawings">
              <HottestDrawings drawings={this.state.hottestDrawings}/>
            </div>
            <p className="section-title">All Draws</p>
            <div className="all-other-drawings">
              {
                drawings.map(function (drawing) {
                  return (
                    <DrawThumbnail key={drawing.id} typeOfThumb="show-pic" drawing={drawing}/>
                  );
                })
              }
            </div>
            <PagesButton handlePageClick={this.handlePageClick} currentPage={this.props.params.id ? this.props.params.id : 1}/>
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
