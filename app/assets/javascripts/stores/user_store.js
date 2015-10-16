(function(root) {
  'use strict';
  var _user = null, CHANGE_EVENT = "changed";

  function resetUser (user) {
    _user = user;
    _user.drawings = user.drawings.map(function (drawing) {
      drawing.content = parseDrawingContent(drawing.content);
      return drawing;
    });
    UserStore.changed();
  }

  function parseDrawingContent (content) {
    var CellsArray = JSON.parse(content);
    return CellsArray.map(function (cell, idx) {
      return ({ id: idx, style: { "backgroundColor": cell } });
    });
  }

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    get: function () {
      return _user;
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
        case UserConstants.RECEIVE_USER:
          resetUser(action.user);
          break;
      }
    })
  });
}(this));
