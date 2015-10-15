(function(root) {
  'use strict';
  root.UserDetails = React.createClass({
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
      console.log("user detail mounted");
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchUserDetails(this.props.params.id);
    },

    componentWillUnmount: function () {
      console.log("Unmounting user detail");
      UserStore.removeChangeListener(this._onChange);
    },

    render: function () {
      var user = this.state.user;
      if (user) {
        return(
          <div className="user-details-container">
            <div className="user-details-header">
              <p className="username">
                {user.username}
              </p>
            </div>

            <div className="user-details-body">
              <div className="show-thumbnails-container">
                {
                  user.drawings.map(function (drawing, idx) {
                    return (
                      <DrawThumbnail key={drawing.id} typeOfThumb="show-pic" drawing={drawing}/>
                    );
                  })
                }
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="loading-page">
            <Spinner spinnerName='cube-grid pulse'/>
          </div>
        );
      }
    }
  });
}(this));
