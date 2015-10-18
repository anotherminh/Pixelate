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

  decrementKudos: function (kudo) {
    AppDispatcher.dispatch({
      actionType: KudosConstants.TAKEAWAY_KUDO,
      kudo: kudo
    });
  },

  receiveNewComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_NEW_COMMENT,
      comment: comment
    });
  },

  receiveSearchResults: function (results) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_RESULTS,
      results: results
    });
  },

  receiveDeletedDrawingInfo: function (drawing) {
    AppDispatcher.dispatch({
      actionType: DrawingsConstants.DRAWING_DELETED,
      drawing: drawing
    });
  }
};
