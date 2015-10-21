(function(root) {
  'use strict';
  var _drawings = [], CHANGE_EVENT = "changed",
      _hottestDrawings = [], HOT_DRAWS_RECEIVED = "received",
      _drawingsCount = null;

  function resetHotDrawings (response) {
    _hottestDrawings = response.drawings;
    reveal_liker_ids(_hottestDrawings);
    DrawingsStore.changed();
  }

  function resetDrawings (response) {
    _drawings = response.drawings;
    _drawingsCount = response.all_drawings_count;
    reveal_liker_ids(_drawings);
    DrawingsStore.changed();
  }

  function reveal_liker_ids (drawings) {
    drawings.forEach(function (drawing) {
      drawing.kudos = drawing.kudos.map(function (kudo) {
        return kudo.user_id;
      });
    });
  }

  function incrementKudos (kudo) {
    var likedDrawing = findDrawingById(kudo.drawing_id);
    var HotLikedDrawing = findHottestDrawingById(kudo.drawing_id);

    likedDrawing.kudos.push(kudo.user_id);
    if (HotLikedDrawing) {
      HotLikedDrawing.kudos.push(kudo.user_id);
    }

    DrawingsStore.changed();
  }

  function decrementKudos (kudo) {
    var UnlikedDrawing = findDrawingById(kudo.drawing_id);
    var HotUnlikedDrawing = findHottestDrawingById(kudo.drawing_id);

    var idx = UnlikedDrawing.kudos.indexOf(kudo.user_id);
    UnlikedDrawing.kudos.splice(idx, 1);
    if (HotUnlikedDrawing) {
      idx = HotUnlikedDrawing.kudos.indexOf(kudo.user_id);
      HotUnlikedDrawing.kudos.splice(idx, 1);
    }

    DrawingsStore.changed();
  }

  function findHottestDrawingById (id) {
    for (var i = 0; i < _hottestDrawings.length; i++) {
      if (_hottestDrawings[i].id == id) {
        return _hottestDrawings[i];
      }
    }
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

    getDrawingsCount: function () {
      return _drawingsCount;
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
          resetDrawings(action.response);
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
