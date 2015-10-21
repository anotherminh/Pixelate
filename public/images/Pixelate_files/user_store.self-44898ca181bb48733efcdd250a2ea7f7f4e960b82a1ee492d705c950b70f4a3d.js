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

  function findDrawingIdx (id) {
    var drawings = _user.drawings;
    for (var i = 0; i < drawings.length; i++) {
      if (drawings[i].id == id) {
        return i;
      }
    }
  }

  function deleteDrawing (drawing) {
    var deletedDrawingIdx = findDrawingIdx(drawing.id);
    _user.drawings.splice(deletedDrawingIdx, 1);
    UserStore.changed();
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
        case DrawingsConstants.DRAWING_DELETED:
          deleteDrawing(action.drawing);
          break;
      }
    })
  });
}(this));
