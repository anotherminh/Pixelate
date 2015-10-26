(function(root) {
  'use strict';
  root.UserResult = React.createClass({
    mixins: [ReactRouter.History],

    renderSearchThumb: function (canvas) {
      if (!canvas) {return;}
      var dataURL = this.props.user.drawing;
      canvas = canvas.getDOMNode();
      if (dataURL !== undefined && dataURL !== null) {
        var context, image;
        canvas.width = 100;
        canvas.height = 100;
        context = canvas.getContext('2d');
        image = document.createElement("img");
        image.src = dataURL;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    },

    handleClick: function () {
      var url = '/users/' + this.props.user.id;
      this.history.pushState(null, url);
    },

    render: function () {
      var user = this.props.user;

      return (
        <div className="result-entry" onClick={this.handleClick}>
          <canvas className="result-thumb" ref={function (canvas) {
                    this.renderSearchThumb(canvas);
                  }.bind(this)}>
          </canvas>
          <div className="search-result-info">
            <p>Username: {user.username}</p>
            <p>Member Since: {user.created_at}</p>
          </div>
        </div>
      );
    }
  });
}(this));
