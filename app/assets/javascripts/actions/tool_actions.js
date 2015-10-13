ToolActions = {
  receiveNewActiveTool: function (tool) {
    AppDispatcher.dispatch({
      actionType: ToolConstants.RECEIVE_NEW_ACTIVE_TOOL,
      tool: tool
    });
  }
};
