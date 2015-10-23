(function(root) {
  'use strict';
  root.Canvas = React.createClass({
    getInitialState: function () {
      return { mouseDown: false };
    },

    handleMouseUp: function () {
      this.setState({ mouseDown: false });
    },

    handleMouseDown: function () {
      var copy = $.extend(true, {}, this.props.drawing);
      ApiActions.saveToHistory(copy);
      this.setState({ mouseDown: true });
    },

    render: function () {
      var that = this;
      var canvas = that.props.drawing;
      var style = {width: ((canvas.size * 10) + (canvas.size * 2))};
      var cells = canvas.content;
      return (
        <div className="canvas"
             id="save-me"
             style={style}
             onClick={this.props.fillArea}>
             {
               cells.map(function (cell, idx) {
                 return <Cell key={cell.id}
                              idx={idx}
                              cell={cell}
                              brushSize={that.props.brushSize}
                              paintbucketOn={that.props.paintbucketOn}
                              handleMouseDown={that.handleMouseDown}
                              handleMouseUp={that.handleMouseUp}
                              mouseDown={that.state.mouseDown}
                              handleHover={that.handleHover}/>;
               })
             }
        </div>
      );
    }
  });
}(this));
