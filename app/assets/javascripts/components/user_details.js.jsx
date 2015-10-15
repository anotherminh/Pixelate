(function(root) {
  'use strict';
  root.UserDetails = React.createClass({
    getInitialState: function () {
      return { user: UserStore.get() };
    },

    _onChange: function () {
      this.setState({ user: UserStore.get() });
    },

    componentWillReceiveProps: function (newProps) {
      console.log("fetching another user");
      ApiUtil.fetchUserDetails(newProps.params.id);
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchUserDetails(this.props.params.id);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
    },

    render: function () {
      var user = this.state.user;
      if (user) {
        return(
          <div className="user-details-container">
            <div className="user-details-header">
              <DrawThumbnail typeOfThumb="profile-pic" drawing={user.drawings[0]}/>
              <p className="username">
                {user.username}
              </p>
            </div>

            <div className="user-details-body">
              <div className="show-thumbnails-container">
                {
                  user.drawings.map(function (drawing, idx) {
                    return (
                      <DrawThumbnail key={idx} typeOfThumb={"show-pic" + idx} drawing={drawing}/>
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
