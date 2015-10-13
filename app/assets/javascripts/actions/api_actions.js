ApiActions = {
  receiveSavedDrawing: function (drawing) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.RECEIVE_SAVED_DRAWING,
      drawing: drawing
    });
  },

  sendCellstoCellsStore: function (cells) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.RECEIVE_CELLS,
      cells: cells
    });
  }
};
