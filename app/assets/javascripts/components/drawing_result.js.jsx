(function(root) {
  'use strict';
  root.DrawingResult = React.createClass({
    mixins: [ReactRouter.History],

    renderSearchThumb: function (canvas) {
      if (!canvas) {return;}
      var dataURL = this.props.drawing.data_url;
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
      var url = '/drawing_details/' + this.props.drawing.id;
      this.history.pushState(null, url);
    },

    render: function () {
      return (
        <div className="result-entry" onClick={this.handleClick}>
          <canvas className="result-thumb" ref={function (canvas) {
                    this.renderSearchThumb(canvas);
                  }.bind(this)}>
          </canvas>
          <div className="search-result-info">
            <p>Title: {this.props.drawing.title}</p>
            <p>by: {this.props.drawing.username}</p>
          </div>
        </div>
      );
    }
  });
}(this));
