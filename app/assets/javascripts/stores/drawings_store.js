(function(root) {
  'use strict';
  var _drawing = null, CHANGE_EVENT = "changed";

  function loadDrawing (drawing) {
    _drawing = drawing;
    _drawing.content = parseDrawingContent(drawing.content);
    DrawingsStore.changed();
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

  root.DrawingsStore = $.extend({}, EventEmitter.prototype, {
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

    dispatcherID: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case DrawingConstants.RECEIVE_SAVED_DRAWING:
          debugger
          loadDrawing(action.drawing);
          break;
        case DrawingConstants.UPDATE_CELL:
          updateCell(action.cell);
          break;
      }
    })
  });
}(this));
