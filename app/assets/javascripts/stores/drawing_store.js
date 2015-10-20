(function(root) {
  'use strict';

  var _drawing = null,
  _message = null,
  CHANGE_EVENT = "changed",
  NEW_DRAWING_SAVE_SUCCESS = "NEW_DRAWING_SAVE_SUCCESS",
  MESSAGE = "SAVE MESSAGE",
  FINISHED_PAINT = "FINISHED_PAINT";

  function loadDrawing (drawing, message) {
    _drawing = drawing;
    _message = message;
    _drawing.content = parseDrawingContent(drawing.content);
    DrawingStore.changed();
  }

  function loadNewSavedDrawing (drawing, message) {
    _drawing = drawing;
    _message = message;
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

  function addNewComment (comment) {
    _drawing.comments.unshift(comment);
    DrawingStore.changed();
  }

  function deleteComment (comment) {
    var comments = _drawing.comments;
    var idx;
    for (var i = 0; i < comments.length; i++) {
      if (comments[i].id == comment.id) {
        idx = i;
        break;
      }
    }

    comments.splice(idx, 1);
    DrawingStore.changed();
  }

  function paintbucket (StartCellIdx) {
    //figure out the color of the first cell, then color every
    //adjacent cell of the same color until there is no more
    StartCellIdx = (parseInt(StartCellIdx));
    var CurrentSelectedColor = ColorStore.get();
    var StartCellColor = _drawing.content[StartCellIdx].style.backgroundColor;

    var CellsToPaint = [];
    var neighbors = [StartCellIdx];

    while (neighbors.length > 0) {

      var current_parent = neighbors.shift();
      CellsToPaint.push(current_parent);
      neighbors = neighbors.concat(findEligibleNeighborCell(StartCellColor, current_parent, neighbors, CellsToPaint));
    }

    CellsToPaint.forEach(function (idx) {
      _drawing.content[idx].style.backgroundColor = CurrentSelectedColor;
    });
    
    DrawingStore.changed();
  }

  function findEligibleNeighborCell (startColor, startIdx, neighbors, CellsToPaint) {
    var eligibleCells = [];
    var width = parseInt(_drawing.size);
    startIdx = parseInt(startIdx);

    var up = startIdx - parseInt(_drawing.size),
        down = startIdx + parseInt(_drawing.size),
        left = startIdx - 1,
        right = startIdx + 1;
    [up, down, left, right].forEach(function (i) {
       //will break if we are comparing white and #ffffff
      if (_drawing.content[i] && (((_drawing.content[i].style.backgroundColor === startColor) &&
         (neighbors.indexOf(i) === -1)) &&
         (CellsToPaint.indexOf(i) === -1))) {
        eligibleCells.push(i);
      }
    });

    return eligibleCells;
  }

  root.DrawingStore = $.extend({}, EventEmitter.prototype, {
    get: function () {
      return _drawing;
    },

    message: function () {
      return _message;
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
          loadDrawing(action.drawing, action.message);
          break;
        case DrawingConstants.UPDATE_CELL:
          updateCell(action.cell);
          break;
        case DrawingConstants.NEW_DRAWING_SAVED:
          loadNewSavedDrawing(action.drawing, action.message);
          break;
        case CommentConstants.RECEIVE_NEW_COMMENT:
          addNewComment(action.comment);
          break;
        case CommentConstants.DELETED_COMMENT_RECEIVED:
          deleteComment(action.comment);
          break;
        case ToolsConstants.PAINTBUCKET:
          paintbucket(action.cell);
          break;
      }
    })
  });
}(this));
