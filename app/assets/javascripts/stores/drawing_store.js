(function(root) {
  'use strict';
  var _drawing = null,
  CHANGE_EVENT = "changed",
  NEW_DRAWING_SAVE_SUCCESS = "NEW_DRAWING_SAVE_SUCCESS";

  function loadDrawing (drawing) {
    _drawing = drawing;
    _drawing.content = parseDrawingContent(drawing.content);
    DrawingStore.changed();
  }

  function loadNewSavedDrawing (drawing) {
    _drawing = drawing;
    _drawing.content = parseDrawingContent(drawing.content);
    DrawingStore.newDrawingSaved();
  }

  // create objects out of cells such that they can be easily
  // rendered later in our canvas component
  function parseDrawingContent (content) {
    var CellsArray = JSON.parse(content);
    return CellsArray.map(function (cell, idx) {
      return ({ id: idx, style: { "backgroundColor": cell } });
    });
  }

  function updateCell (cell) {
    _drawing.content[cell.id] = cell;
  }

  root.DrawingStore = $.extend({}, EventEmitter.prototype, {
    get: function () {
      return _drawing;
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

    addNewDrawingSaveListener: function (callback) {
      this.on(NEW_DRAWING_SAVE_SUCCESS, callback);
    },

    removeNewDrawingSaveListener: function (callback) {
      this.removeListener(NEW_DRAWING_SAVE_SUCCESS, callback);
    },

    newDrawingSaved: function () {
      this.emit(NEW_DRAWING_SAVE_SUCCESS);
    },

    dispatcherID: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case DrawingConstants.RECEIVE_DRAWING:
          loadDrawing(action.drawing);
          break;
        case DrawingConstants.UPDATE_CELL:
          updateCell(action.cell);
          break;
        case DrawingConstants.NEW_DRAWING_SAVED:
          loadNewSavedDrawing(action.drawing);
          break;
      }
    })
  });
}(this));
