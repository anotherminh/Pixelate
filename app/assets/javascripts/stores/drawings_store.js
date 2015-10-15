(function(root) {
  'use strict';
  var _drawings = [], CHANGE_EVENT = "changed";

  function resetDrawings (drawings) {
    _drawings = drawings;
    DrawingsStore.changed();
  }

  root.DrawingsStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _drawings.slice();
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
        case DrawingsConstants.RECEIVE_ALL_DRAWINGS:
          resetDrawings(action.drawings);
          break;
      }
    })
  });
}(this));
