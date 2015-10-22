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
      ApiUtil.fetchUserDetails(newProps.params.id);
    },

    componentDidMount: function () {
      var id = this.props.params.id;
      if (typeof(this.props.params.id) === 'undefined') {
        id = current_user_id;
      }

      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchUserDetails(id);
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
