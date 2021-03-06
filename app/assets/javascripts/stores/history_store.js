(function(root) {
  'use strict';
  var _previousStates = []; //max is 6

  function updateHistory (state_of_drawing) {
    if (_previousStates.length > 5) {
      _previousStates.shift();
    }

    _previousStates.push(state_of_drawing);
  }

  root.HistoryStore = $.extend({}, EventEmitter.prototype, {
    getLastState: function () {
      return _previousStates.pop();
    },

    dispatcherID: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case DrawingConstants.RECEIVE_HISTORY_STATE:
          updateHistory(action.state);
          break;
      }
    })
  });
}(this));
