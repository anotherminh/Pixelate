(function(root) {
  'use strict';
  var _activeColor = "red", CHANGE_EVENT = "changed";

  function updateActiveColor (color) {
    _activeColor = color;
    // ColorStore.changed();
  }

  root.ColorStore = $.extend({}, EventEmitter.prototype, {
    get: function () {
      return _activeColor;
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
        case PaletteConstants.RECEIVE_NEW_ACTIVE_COLOR:
          updateActiveColor(action.color);
          break;
      }
    })
  });
}(this));
