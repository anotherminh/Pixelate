ToolActions = {
  paintbucket: function (cell_idx) {
    AppDispatcher.dispatch({
      actionType: ToolsConstants.PAINTBUCKET,
      cell: cell_idx
    });
  },

  paintMedium: function (cell_idx) {
    console.log("dispatching medium");
    AppDispatcher.dispatch({
      actionType: ToolsConstants.PAINT_MEDIUM,
      cell: cell_idx
    });
  },

  paintLarge: function (cell_idx) {
    console.log("dispatching large");
    AppDispatcher.dispatch({
      actionType: ToolsConstants.PAINT_LARGE,
      cell: cell_idx
    });
  }
};
