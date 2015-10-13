(function(root) {
  'use strict';
  root.SessionUtil = {
    LogOut: function () {
      $.ajax({
        url: '/session',
        type: 'delete',
        dataType: 'json',
        success: function (response) {
          window.location.href = '/session/new';
        }
      });
    }
  };
}(this));
