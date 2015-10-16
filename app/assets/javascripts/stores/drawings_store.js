(function(root) {
  'use strict';
  var _drawings = [], CHANGE_EVENT = "changed";

  function resetDrawings (drawings) {
    _drawings = drawings;
    reveal_liker_ids();
    DrawingsStore.changed();
  }

  function reveal_liker_ids () {
    _drawings.forEach(function (drawing) {
      drawing.kudos = drawing.kudos.map(function (kudo) {
        return kudo.user_id;
      });
    });
  }

  function incrementKudos (kudo) {
    var likedDrawing = findDrawingById(kudo.drawing_id);
    likedDrawing.kudos.push(kudo.user_id);
    DrawingsStore.changed();
  }

  function decrementKudos (kudo) {
    var likedDrawing = findDrawingById(kudo.drawing_id);
    var idx = likedDrawing.kudos.indexOf(kudo.user_id);
    likedDrawing.kudos.splice(idx, 1);
    DrawingsStore.changed();
  }

  function findDrawingById (id) {
    for (var i = 0; i < _drawings.length; i++) {
      if (_drawings[i].id == id) {
        return _drawings[i];
      }
    }
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
        case KudosConstants.RECEIVE_KUDO:
          incrementKudos(action.kudo);
          break;
        case KudosConstants.TAKEAWAY_KUDO:
          decrementKudos(action.kudo);
          break;
      }
    })
  });
}(this));
