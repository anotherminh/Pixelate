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

    handleLeavingCanvas: function () {
      this.setState({ mouseDown: false });
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
             onClick={this.props.paintbucket}
             onMouseLeave={that.handleLeavingCanvas}>
             {
               cells.map(function (cell, idx) {
                 return <Cell key={cell.id}
                              idx={idx}
                              cell={cell}
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
