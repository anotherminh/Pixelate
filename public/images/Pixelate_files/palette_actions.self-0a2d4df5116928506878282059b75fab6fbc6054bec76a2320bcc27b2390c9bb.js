PaletteActions = {
  receiveNewActiveColor: function (color) {
    AppDispatcher.dispatch({
      actionType: PaletteConstants.RECEIVE_NEW_ACTIVE_COLOR,
      color: color
    });
  }
};
