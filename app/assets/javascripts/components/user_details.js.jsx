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

    componentDidUpdate: function () {
      this.parseDataURI('#profile', UserStore.get().drawings[0].data_url);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
    },

    parseDataURI: function (nameOfCanvas, dataURL) {
      // use this function to load the image on show or index page
      if (dataURL !== undefined && dataURL !== null) {
        var canvas, context, image;
        canvas = $(nameOfCanvas)[0];
        canvas.width = 150;
        canvas.height = 150;
        context = canvas.getContext('2d');
        image = document.createElement("img");
        image.addEventListener('load', function(){
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        }, false);
        image.src = dataURL;
      }
    },

    render: function () {
      var user = this.state.user;
      if (user) {
        return(
          <div className="user-details-container">
            <div className="user-details-header">
              <canvas id="profile"></canvas>
              <p className="username">
                {user.username}
              </p>
            </div>

            <div className="user-details-body">
              <canvas ref="show"></canvas>
              "not rendering the other draws yet"
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
