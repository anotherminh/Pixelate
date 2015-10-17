(function(root) {
  'use strict';
  var CHANGE_EVENT = "changed", _userMatches = [], _drawingMatches = [];

  function resetResults (results) {
    _userMatches = results.user_matches;
    _drawingMatches = results.drawing_matches;
    SearchResultsStore.changed();
  }

  root.SearchResultsStore = $.extend({}, EventEmitter.prototype, {
    userResults: function () {
      return _userMatches.slice();
    },

    drawingResults: function () {
      return _drawingMatches.slice();
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    changed: function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case SearchConstants.RECEIVE_RESULTS:
          resetResults(action.results);
          break;
      }
    })
  });
}(this));
