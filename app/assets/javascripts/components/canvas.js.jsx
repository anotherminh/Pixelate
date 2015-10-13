(function(root) {
  'use strict';
  root.Canvas = React.createClass({
    getInitialState: function () {
      return { mouseDown: false };
    },

    toggleClick: function () {
      console.log("toggle click");
      if (this.state.mouseDown) {
        this.setState({ mouseDown: false });
      } else {
        this.setState({ mouseDown: true });
      }
    },

    render: function () {
      var that = this;
      var canvas = that.props.drawing;
      var style = {width: ((canvas.size * 15) + (canvas.size * 2))};
      var cells = canvas.content;

      return (
        <div className="canvas"
             style={style}>
             {
               cells.map(function (cell) {
                 return <Cell key={cell.id}
                              cell={cell}
                              toggleClick={that.toggleClick}
                              mouseDown={that.state.mouseDown}
                              handleHover={that.handleHover}/>;
               })
             }
        </div>
      );
    }
  });
}(this));
