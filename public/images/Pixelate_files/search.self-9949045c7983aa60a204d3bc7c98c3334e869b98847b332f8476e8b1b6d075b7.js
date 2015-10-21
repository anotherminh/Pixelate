(function (root) {
  'use strict';
  var LinkedStateMixin = React.addons.LinkedStateMixin;

  root.Search = React.createClass({
    displayName: "Search",

    mixins: [LinkedStateMixin, ReactRouter.History],

    getInitialState: function () {
      return { input: "", userResults: null, drawingResults: null };
    },

    runSearch: function () {
      ApiUtil.runSearch(this.state.input);
    },

    _onChange: function () {
      this.setState({
        userResults: SearchResultsStore.userResults(),
        drawingResults: SearchResultsStore.drawingResults()
      });
    },

    componentDidMount: function () {
      SearchResultsStore.addChangeListener(this._onChange);
    },

    componentWillUnMount: function () {
      SearchResultsStore.removeChangeListener(this._onChange);
    },

    render: function () {
      if (this.state.userResults || this.state.drawingResults) {
        return React.createElement(
          "div",
          { className: "search-container" },
          React.createElement(
            "form",
            { className: "search-form" },
            React.createElement("input", { className: "search-bar", valueLink: this.linkState('input') }),
            React.createElement(
              "button",
              {
                className: "submit-search",
                onClick: this.runSearch, type: "submit" },
              "Search"
            )
          ),
          React.createElement(
            "div",
            { className: "search-results" },
            React.createElement(
              "div",
              { className: "results-title" },
              "User Matches Found:"
            ),
            this.state.userResults.map(function (result, idx) {
              return React.createElement(UserResult, { key: idx, user: result });
            })
          ),
          React.createElement(
            "div",
            { className: "search-results" },
            React.createElement(
              "div",
              { className: "results-title" },
              "Drawing Matches Found:"
            ),
            this.state.drawingResults.map(function (result, idx) {
              return React.createElement(
                "div",
                null,
                React.createElement(DrawingResult, { key: idx, drawing: result })
              );
            })
          )
        );
      } else {
        return React.createElement(
          "div",
          { className: "search-container" },
          React.createElement(
            "form",
            { className: "search-form" },
            React.createElement("input", { className: "search-bar", valueLink: this.linkState('input') }),
            React.createElement(
              "button",
              {
                className: "submit-search",
                onClick: this.runSearch, type: "submit" },
              "Search"
            )
          )
        );
      }
    }
  });
})(this);