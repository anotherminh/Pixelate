(function(root) {
  'use strict';
  root.DrawThumbnail = React.createClass({
    render: function () {
      var drawing = this.props.drawing;
      var thumbnail_size = { width: (drawing.size * 3) };
      var klass = "draw-thumbnail";

      switch (this.props.typeOfThumbnail) {
        case "profile":
          klass += " profile-pic";
          break;
        case "index-thumb":
          klass += " index-thumb";
          break;
      }

      return (
        <div style={thumbnail_size} className={klass}>
          {
            drawing.content.map (function (cellObj, idx) {
              return (
                <div className="thumbnail-cell"
                   style={cellObj.style}
                   key={idx}>
                 </div>
              );
            })
          }
        </div>
      );
    }
  });
}(this));
