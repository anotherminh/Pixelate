(function(root) {
  'use strict';
  root.HottestDrawings = React.createClass({
    render: function () {
      var drawings = this.props.drawings;
      if (drawings.length > 0) {
        return (
          <div>
            {
              drawings.map(function (drawing) {
                return (
                  <DrawThumbnail key={drawing.id} typeOfThumb="show-pic" drawing={drawing}/>
                );
              })
            }
          </div>
        );
      } else {
        return <Spinner spinnerName='cube-grid fade-in'/>;
      }
    }
  });
}(this));
