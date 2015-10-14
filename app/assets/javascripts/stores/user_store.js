(function(root) {
  'use strict';
  var _user = null, CHANGE_EVENT = "changed";
  function reset_user (user) {
    _user = user;
    UserStore.changed();
  }
  
  root.UserStore = $.extend({}, EventEmitter.prototype, {
    get: function () {
      return _user;
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    changed: function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function (action) {
      switch (action.actionType) {
        case UserConstants.RECEIVE_USER:
          reset_user(action.user);
          break;
      }
    })
  });
}(this));
