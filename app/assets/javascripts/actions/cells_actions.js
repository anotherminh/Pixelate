CellsActions = {
  registerCurrentCoord: function (coord) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.REGISTER_CURRENT_COORD,
      coord: coord
    });
  }
};
