(function(root) {
  'use strict';
  var _activeTool = null, CHANGE_EVENT = "changed";

  function updateActiveTool (tool) {
    _activeTool = tool;
    ToolStore.changed();
  }

  root.ToolStore = $.extend({}, EventEmitter.prototype, {
    get: function () {
      return _activeTool;
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
        case ToolConstants.RECEIVE_NEW_ACTIVE_TOOL:
          updateActiveTool(action.tool);
          break;
      }
    })
  });
}(this));
