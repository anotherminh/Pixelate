(function(root) {
  'use strict';
  var LinkedStateMixin = React.addons.LinkedStateMixin;

  root.Search = React.createClass({
    mixins: [LinkedStateMixin, ReactRouter.History],

    getInitialState: function () {
      return { input: "", userResults: null, drawingResults: null, clicked: false };
    },

    runSearch: function () {
      if (!clicked) {
        this.state.clicked = true;
        ApiUtil.runSearch(this.state.input);
      }
    },

    _onChange: function () {
      this.setState({
        userResults: SearchResultsStore.userResults(),
        drawingResults: SearchResultsStore.drawingResults(),
        clicked: false
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
        return (
          <div className="search-container">
            <form className="search-form">
              <input className= "search-bar" valueLink={this.linkState('input')}/>
                <button
                  className="submit-search"
                  onClick={this.runSearch} type="submit">
                  Search
                </button>
            </form>

            <div className="search-results">
              <div className="results-title">User Matches Found:</div>
              {
                this.state.userResults.map(function (result, idx) {
                  return <UserResult key={idx} user={result}/>;
                })
              }
            </div>

            <div className="search-results">
              <div className="results-title">Drawing Matches Found:</div>
              {
                this.state.drawingResults.map(function (result, idx) {
                  return (
                    <div>
                      <DrawingResult key={idx} drawing={result}/>
                    </div>
                  );
                })
              }
            </div>
          </div>
        );
      } else {
        return (
          <div className="search-container">
            <form className="search-form">
              <input className= "search-bar" valueLink={this.linkState('input')}/>
                <button
                  className="submit-search"
                  onClick={this.runSearch} type="submit">
                  Search
                </button>
            </form>
          </div>
        );
      }
    }
  });
}(this));
