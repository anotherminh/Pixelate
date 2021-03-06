(function(root) {
  'use strict';
  root.DrawThumbnail = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { showButton: false, buttonType: '' };
    },

    handleClick: function (e) {
      e.stopPropagation();
      var buttonClicked = e.currentTarget.innerHTML;
      switch (buttonClicked) {
        case "Edit Drawing":
          if (current_user_id == this.props.drawing.user_id) {
            var url = '/drawings/' + this.props.drawing.id;
            this.history.pushState(null, url);
          }
          break;
        case "Give Kudos":
          ApiUtil.giveKudo({
            drawing_id: this.props.drawing.id,
            from: "global"
          });
          break;
        case "Un-kudos":
          ApiUtil.dislike({
            drawing_id: this.props.drawing.id,
            from: "global"
          });
          break;
      }
    },

    handleHover: function () {
      this.setState({ showButton: true });
    },

    handleMouseLeave: function () {
      this.setState( { showButton: false, buttonType: '' });
    },

    showDrawing: function (e) {
      var url = '/drawing_details/' + this.props.drawing.id;
      this.history.pushState(null, url);
    },

    renderCanvas: function (canvas) {
      if (!canvas) { return; }
      var dataURL = this.props.drawing.data_url;
      canvas = canvas.getDOMNode();
      if (dataURL !== undefined && dataURL !== null) {
        var context, image;
        canvas.width = 150;
        canvas.height = 150;
        context = canvas.getContext('2d');
        image = document.createElement("img");
        image.src = dataURL;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    },

    buttonText: function () {
      var drawing = this.props.drawing;
      if (current_user_id == drawing.user_id) {
        return 'Edit Drawing';
      } else if (drawing.kudos.indexOf(parseInt(current_user_id)) === -1) {
        return 'Give Kudos';
      } else {
        return 'Un-kudos';
      }
    },

    deleteDrawing: function (e) {
      e.stopPropagation();
      ApiUtil.deleteDrawing(this.props.drawing.id);
    },

    render: function () {
      var button, DeleteButton;
      var statsClass = "thumbnail-stats stats-hide";

      if (this.state.showButton) {
        button = (
          <div onClick={this.handleClick} className="thumb-button">{this.buttonText()}
          </div>
        );

        statsClass = "thumbnail-stats stats-show";
      }

      if (current_user_id == this.props.drawing.user_id) {
        DeleteButton = (
          <div onClick={this.deleteDrawing} className="delete-button"></div>
        );
      }

      return (
        <div className="thumbnail-and-button"
          onMouseOver={this.handleHover}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.showDrawing}>
          {button}
          <canvas className={this.props.typeOfThumb}
                  ref={function (canvas) {
                    this.renderCanvas(canvas);
                  }.bind(this)}>
          </canvas>
          <div className={statsClass}>
            <p className="kudo-count">Kudos: {this.props.drawing.kudos.length}</p>
            {DeleteButton}
          </div>
        </div>
      );
    }
  });
}(this));
