ToolActions = {
  paintbucket: function (cell_idx) {
    AppDispatcher.dispatch({
      actionType: ToolsConstants.PAINTBUCKET,
      cell: cell_idx
    });
  }
};
