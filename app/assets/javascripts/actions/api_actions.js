ApiActions = {
  receiveSavedDrawing: function (drawing) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.RECEIVE_SAVED_DRAWING,
      drawing: drawing
    });
  }
};
