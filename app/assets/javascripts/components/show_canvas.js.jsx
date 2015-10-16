(function(root) {
  'use strict';
  root.ShowCanvas = React.createClass({
    getInitialState: function () {
      return { mouseDown: false };
    },

    render: function () {
      var that = this;
      var canvas = that.props.drawing;
      var style = {width: ((canvas.size * 10) + (canvas.size * 2))};
      var cells = canvas.content;

      return (
        <div className="canvas"
             style={style}>
             {
               cells.map(function (cell) {
                 return (
                   <div className="show-cell"
                        style={cell.style}
                        key={cell.id}>
                   </div>
                 );
               })
             }
        </div>
      );
    }
  });
}(this));
