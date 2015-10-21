(function (root) {
  'use strict';
  root.Browse = React.createClass({
    displayName: "Browse",

    getInitialState: function () {
      return { drawings: DrawingsStore.all() };
    },

    _onChange: function () {
      this.setState({ drawings: DrawingsStore.all() });
    },

    componentDidMount: function () {
      DrawingsStore.addChangeListener(this._onChange);
      ApiUtil.fetchBrowsePage(1);
    },

    render: function () {
      var drawings = this.state.drawings;
      if (drawings.length !== 0) {
        return React.createElement(
          "div",
          { className: "index" },
          React.createElement(
            "p",
            { className: "section-title" },
            "Hottest Draws"
          ),
          React.createElement(
            "div",
            { className: "hot-drawings" },
            React.createElement(HottestDrawings, null)
          ),
          React.createElement(
            "p",
            { className: "section-title" },
            "All Draws"
          ),
          React.createElement(
            "div",
            { className: "all-other-drawings" },
            drawings.map(function (drawing) {
              return React.createElement(DrawThumbnail, { key: drawing.id, typeOfThumb: "show-pic", drawing: drawing });
            })
          ),
          React.createElement(PagesButton, { currentPage: this.props.params.id ? this.props.params.id : 1 })
        );
      } else {
        return React.createElement(
          "div",
          { className: "index" },
          React.createElement(
            "p",
            { className: "section-title" },
            "Hottest Draws"
          ),
          React.createElement("div", { className: "hot-drawings" }),
          React.createElement(
            "p",
            { className: "section-title" },
            "All Draws"
          ),
          React.createElement(
            "div",
            { className: "all-other-drawings" },
            React.createElement(Spinner, { spinnerName: "cube-grid fade-in" })
          )
        );
      }
    }
  });
})(this);