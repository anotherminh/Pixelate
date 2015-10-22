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
        url: '/api/drawings/' + id + '/edit',
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
          ApiActions.receiveDrawing(response, "Save successful!");
        },
        error: function (response) {
          console.log("failed to save");
          ApiActions.receiveDrawing(response, "Failed to save.");
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
          ApiActions.newDrawingSaved(response, "Save successful!");
        },
        error: function (response) {
          console.log("failed to save");
          ApiActions.newDrawingSaved(response, "Failed to save.");
        }
      });
    },

    makeNewDrawing: function () {
      $.ajax({
        url: '/api/drawings/new',
        type: 'get',
        dataType: 'json',
        success: function (response) {
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

    fetchBrowsePage: function (page_num) {
      $.ajax({
        url: '/api/browse/' + page_num,
        type: 'get',
        dataType: 'json',
        success: function (response) {
          ApiActions.receiveAllDrawings(response);
        }
      });
    },

    fetchBestDrawings: function () {
      $.ajax({
        url: '/api/best_drawings/',
        type: 'get',
        dataType: 'json',
        success: function (response) {
          ApiActions.receiveBestDrawings(response);
        }
      });
    },

    giveKudo: function (drawing_id) {
      $.ajax({
        url: '/api/kudos',
        type: 'post',
        data: { kudo: {drawing_id: drawing_id } },
        dataType: 'json',
        success: function (response) {
          ApiActions.receiveKudo(response);
        }
      });
    },

    dislike: function (drawing_id) {
      $.ajax({
        url: '/api/kudos/' + drawing_id,
        type: 'delete',
        dataType: 'json',
        success: function (response) {
          ApiActions.decrementKudos(response);
        }
      });
    },

    postComment: function (drawing_id, body) {
      $.ajax({
        url: '/api/comments',
        type: 'post',
        data: { comment: {drawing_id: drawing_id, body: body} },
        dataType: 'json',
        success: function (response) {
          ApiActions.receiveNewComment(response);
        }
      });
    },

    runSearch: function (input) {
      $.ajax({
        url: '/api/users/search/',
        type: 'get',
        data: {input: input},
        dataType: 'json',
        success: function (response) {
          ApiActions.receiveSearchResults(response);
        }
      });
    },

    deleteDrawing: function (drawing_id) {
      $.ajax({
        url: '/api/drawings/' + drawing_id,
        type: 'delete',
        dataType: 'json',
        success: function (response) {
          ApiActions.receiveDeletedDrawingInfo(response);
        }
      });
    },

    loadDrawingShow: function (drawing_id) {
      $.ajax({
        url: '/api/drawings/' + drawing_id,
        type: 'get',
        dataType: 'json',
        success: function(response) {
          ApiActions.receiveDrawing(response);
        }
      });
    },

    deleteComment: function (comment_id) {
      $.ajax({
        url: '/api/comments/' + comment_id,
        type: 'delete',
        dataType: 'json',
        success: function (response) {
          ApiActions.receieveDeletedCommentInfo(response);
        }
      });
    }
  };
}(this));
