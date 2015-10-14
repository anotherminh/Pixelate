ApiActions = {
  receiveDrawing: function (drawing) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.RECEIVE_DRAWING,
      drawing: drawing
    });
  },

  newDrawingSaved: function (drawing) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.NEW_DRAWING_SAVED,
      drawing: drawing
    });
  },

  sendCellstoCellsStore: function (cells) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.RECEIVE_CELLS,
      cells: cells
    });
  },

  receiveUserDetails: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user: user
    });
  }
};
