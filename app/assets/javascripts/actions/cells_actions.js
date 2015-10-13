CellsActions = {
  updateCellsStore: function (cell) {
    AppDispatcher.dispatch({
      actionType: DrawingConstants.UPDATE_CELL,
      cell: cell
    });
  }
};
