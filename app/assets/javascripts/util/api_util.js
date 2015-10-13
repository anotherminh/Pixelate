ApiUtil = {
  loadSavedDrawing: function (id) {
    $.ajax({
      url: 'api/drawings/' + id,
      type: 'get',
      dataType: 'json',
      success: function(response) {
        ApiActions.receiveSavedDrawing(response);
      }
    });
  }
};
