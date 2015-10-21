(function(root) {
  'use strict';
  var _drawings = [], CHANGE_EVENT = "changed",
      _hottestDrawings = [], HOT_DRAWS_RECEIVED = "received";

  function resetHotDrawings (drawings) {
    _hottestDrawings = drawings;
    DrawingsStore.hotDrawsReceived();
  }

  function sortDrawingsByPopularity (drawings) {
    var sorted = [];
    sorted = drawings.sort(function (a, b) {
      if (a.kudos.length > b.kudos.length) {
        return -1;
      } else if (a.kudos.length < b.kudos.length) {
        return 1;
      } else {
        return 0;
      }
    });
    return sorted;
  }

  function resetDrawings (drawings) {
    _drawings = sortDrawingsByPopularity(drawings);
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

  function findDrawingIdx (id) {
    for (var i = 0; i < _drawings.length; i++) {
      if (_drawings[i].id == id) {
        return i;
      }
    }
  }

  function deleteDrawing (drawing) {
    var deletedDrawingIdx = findDrawingIdx(drawing.id);
    _drawings.splice(deletedDrawingIdx, 1);
  }

  root.DrawingsStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _drawings.slice();
    },

    allHotDrawings: function () {
      return _hottestDrawings.slice();
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    addHotDrawsChangeListener: function (callback) {
      this.on(HOT_DRAWS_RECEIVED, callback);
    },

    removeHotDrawsChangeListener: function (callback) {
      this.removeListener(HOT_DRAWS_RECEIVED, callback);
    },

    hotDrawsReceived: function () {
      this.emit(HOT_DRAWS_RECEIVED);
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
        case DrawingsConstants.DRAWING_DELETED:
          deleteDrawing(action.drawing);
          break;
        case DrawingsConstants.BEST_DRAWINGS_RECEIVED:
          resetHotDrawings(action.drawings);
          break;
      }
    })
  });
}(this));
