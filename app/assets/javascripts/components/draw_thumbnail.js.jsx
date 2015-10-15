(function(root) {
  'use strict';
  root.DrawThumbnail = React.createClass({
    componentDidMount: function () {
      this.parseDataURI(this.props.typeOfThumb, this.props.drawing.data_url);
    },

    parseDataURI: function (typeOfThumb, dataURL) {
      // use this function to load the image on show or index page
      if (dataURL !== undefined && dataURL !== null) {
        var canvas, context, image;
        canvas = $("." + typeOfThumb)[0];
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
      var klass = this.props.typeOfThumb;
      if (klass.slice(0, 8) === "show-pic") {
        klass += " thumbnail";
      }

      return (
        <canvas className={klass}></canvas>
      );
    }
  });
}(this));
