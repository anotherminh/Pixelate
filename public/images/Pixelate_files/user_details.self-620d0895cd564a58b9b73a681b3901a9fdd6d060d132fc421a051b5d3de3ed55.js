(function (root) {
  'use strict';
  root.UserDetails = React.createClass({
    displayName: "UserDetails",

    getInitialState: function () {
      return { user: UserStore.get() };
    },

    _onChange: function () {
      console.log("User store has changed");
      this.setState({ user: UserStore.get() });
    },

    componentWillReceiveProps: function (newProps) {
      console.log("fetching another user");
      ApiUtil.fetchUserDetails(newProps.params.id);
    },

    componentDidMount: function () {
      var id = this.props.params.id;
      if (typeof this.props.params.id === 'undefined') {
        id = current_user_id;
      }

      console.log("user detail mounted");
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchUserDetails(id);
    },

    componentWillUnmount: function () {
      console.log("Unmounting user detail");
      UserStore.removeChangeListener(this._onChange);
    },

    render: function () {
      var user = this.state.user;
      if (user) {
        return React.createElement(
          "div",
          { className: "user-details-container" },
          React.createElement(
            "div",
            { className: "user-details-header" },
            React.createElement(
              "p",
              { className: "username" },
              user.username
            )
          ),
          React.createElement(
            "div",
            { className: "user-details-body" },
            React.createElement(
              "div",
              { className: "show-thumbnails-container" },
              user.drawings.map(function (drawing, idx) {
                return React.createElement(DrawThumbnail, { key: drawing.id, typeOfThumb: "show-pic", drawing: drawing });
              })
            )
          )
        );
      } else {
        return React.createElement(
          "div",
          { className: "loading-page" },
          React.createElement(Spinner, { spinnerName: "cube-grid pulse" })
        );
      }
    }
  });
})(this);