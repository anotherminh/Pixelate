(function(root) {
  'use strict';
  root.Canvas = React.createClass({
    getInitialState: function () {
      return { mouseDown: false, activeTool: ToolStore.get() };
    },

    toggleClick: function () {
      if (this.state.mouseDown) {
        this.setState({ mouseDown: false });
      } else {
        this.setState({ mouseDown: true });
      }
    },

    handleToolSelection: function () {
      this.state.activeTool = ToolStore.get();

      switch (this.state.activeTool) {
        case 'save':
          ApiUtil.saveDrawing(this.props.drawing);
          break;
      }
    },

    componentDidMount: function () {
      ToolStore.addChangeListener(this.handleToolSelection);
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
