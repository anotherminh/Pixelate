ApiActions = {
  receiveDrawing: function (drawing, message) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.RECEIVE_DRAWING,
      drawing: drawing,
      message: message
    });
  },

  newDrawingSaved: function (drawing, message) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.NEW_DRAWING_SAVED,
      drawing: drawing,
      message: message
    });
  },

  receiveUserDetails: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user: user
    });
  },

  receiveAllDrawings: function (response) {
    AppDispatcher.dispatch({
      actionType: DrawingsConstants.RECEIVE_ALL_DRAWINGS,
      response: response
    });
  },

  receiveBrowseKudo: function (kudo) {
    AppDispatcher.dispatch({
      actionType: KudosConstants.RECEIVE_BROWSE_KUDO,
      kudo: kudo
    });
  },

  decrementBrowseKudo: function (kudo) {
    AppDispatcher.dispatch({
      actionType: KudosConstants.TAKEAWAY_BROWSE_KUDO,
      kudo: kudo
    });
  },

  receiveShowKudo: function (kudo) {
    AppDispatcher.dispatch({
      actionType: KudosConstants.RECEIVE_SHOW_KUDO,
      kudo: kudo
    });
  },

  decrementShowKudos: function (kudo) {
    AppDispatcher.dispatch({
      actionType: KudosConstants.TAKEAWAY_SHOW_KUDO,
      kudo: kudo
    });
  },

  receiveNewComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVED_NEW_COMMENT,
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
  },

  receieveDeletedCommentInfo: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.DELETED_COMMENT_RECEIVED,
      comment: comment
    });
  },

  receiveBestDrawings: function (drawings) {
    AppDispatcher.dispatch({
      actionType: DrawingsConstants.BEST_DRAWINGS_RECEIVED,
      drawings: drawings
    });
  },

  saveToHistory: function (state) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.RECEIVE_HISTORY_STATE,
      state: state
    });
  },

  UndoDrawing: function (drawing) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.RECEIVE_PAST_DRAWING,
      drawing: drawing
    });
  },

  toggleGrid: function () {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.TOGGLE_GRID
    });
  }
};
