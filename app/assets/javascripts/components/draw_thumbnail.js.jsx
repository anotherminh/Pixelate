(function(root) {
  'use strict';
  root.DrawThumbnail = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { showButton: false, buttonType: '' };
    },

    handleClick: function (e) {
      var buttonClicked = e.currentTarget.innerHTML;
      switch (buttonClicked) {
        case "Edit Drawing":
          if (current_user_id == this.props.drawing.user_id) {
            var url = '/drawings/' + this.props.drawing.id;
            this.history.pushState(null, url);
          }
          break;
        case "Give Kudos":
          ApiUtil.giveKudo(this.props.drawing.id);
          break;
        case "Dislike":
          ApiUtil.dislike(this.props.drawing.id);
          break;
      }
    },

    handleHover: function () {
      var drawing = this.props.drawing;
      if (current_user_id == drawing.user_id) {
        this.setState( { showButton: true, buttonType: 'Edit Drawing' });
      } else if (drawing.kudos.indexOf(parseInt(current_user_id)) === -1) {
        this.setState( { showButton: true, buttonType: 'Give Kudos' });
      } else {
        this.setState( { showButton: true, buttonType: 'Dislike' });
      }
    },

    handleMouseLeave: function () {
      this.setState( { showButton: false, buttonType: '' });
    },

    renderCanvas: function (canvas) {
      if (!canvas) {return;}
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

    render: function () {
      var button;
      var statsClass = "thumbnail-stats stats-hide";

      if (this.state.showButton) {
        button = (
          <div onClick={this.handleClick} className="thumb-button">{this.state.buttonType}
          </div>
        );

        statsClass = "thumbnail-stats stats-show";
      }

      return (
        <div className="thumbnail-and-button"
          onMouseOver={this.handleHover}
          onMouseLeave={this.handleMouseLeave}>
          {button}
          <canvas className={this.props.typeOfThumb}
                  ref={function (canvas) {
                    this.renderCanvas(canvas);
                  }.bind(this)}>
          </canvas>
          <div className={statsClass}>
            <p>Kudos: {this.props.drawing.kudos.length}</p>
          </div>
        </div>
      );
    }
  });
}(this));
