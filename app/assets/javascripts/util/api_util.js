(function(root) {
  'use strict';

  function prepareForSave (drawing) {
    var id = drawing.id;

    drawing.content = drawing.content.map(function (cellObj) {
      return cellObj.style.backgroundColor;
    });

    drawing = { title: drawing.title, size: drawing.size, content: drawing.content, data_url: drawing.data_url };

    return { id: id, drawing: drawing };
  }

  root.ApiUtil = {
    loadSavedDrawing: function (id) {
      $.ajax({
        url: '/api/drawings/' + id,
        type: 'get',
        dataType: 'json',
        success: function(response) {
          ApiActions.receiveDrawing(response);
        }
      });
    },

    saveDrawing: function (drawing) {
      var preparedParams = prepareForSave(drawing);
      $.ajax({
        url: '/api/drawings/' + preparedParams.id,
        type: 'patch',
        dataType: 'json',
        data: { drawing: preparedParams.drawing },
        success: function (response) {
          console.log("saved sucessfully!");
          ApiActions.receiveDrawing(response);
        }
      });
    },

    saveNewDrawing: function (drawing) {
      var preparedParams = prepareForSave(drawing);
      $.ajax({
        url: '/api/drawings/',
        type: 'post',
        dataType: 'json',
        data: { drawing: preparedParams.drawing },
        success: function (response) {
          console.log("saved new drawing sucessfully!");
          ApiActions.newDrawingSaved(response);
        }
      });
    },

    makeNewDrawing: function () {
      $.ajax({
        url: '/api/drawings/new',
        type: 'get',
        dataType: 'json',
        success: function (response) {
          console.log("got new drawing");
          ApiActions.receiveDrawing(response);
        }
      });
    },

    fetchUserDetails: function (id) {
      $.ajax({
        url: '/api/users/' + id,
        type: 'get',
        dataType: 'json',
        success: function (response) {
          ApiActions.receiveUserDetails(response);
        }
      });
    },

    fetchAllDrawings: function () {
      $.ajax({
        url: '/api/drawings/',
        type: 'get',
        dataType: 'json',
        success: function (response) {
          ApiActions.receiveAllDrawings(response);
        }
      });
    }
  };
}(this));
