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
  },

  receiveAllDrawings: function (drawings) {
    AppDispatcher.dispatch({
      actionType: DrawingsConstants.RECEIVE_ALL_DRAWINGS,
      drawings: drawings
    });
  },

  receiveKudo: function (kudo) {
    AppDispatcher.dispatch({
      actionType: KudosConstants.RECEIVE_KUDO,
      kudo: kudo
    });
  },
};
