(function(root) {
  'use strict';
  root.Canvas = React.createClass({
    render: function () {
      var canvas = this.props.drawing;
      var style = {width: ((canvas.size * 15) + (canvas.size * 2))};
      var cells = canvas.content;

      return (
        <div className="canvas"
             style={style}>
             {
               cells.map(function (cell) {
                 return <Cell key={cell.id} cell={cell}/>;
               })
             }
        </div>
      );
    }
  });
}(this));
