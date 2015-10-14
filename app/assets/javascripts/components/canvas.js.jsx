(function(root) {
  'use strict';
  root.Canvas = React.createClass({
    getInitialState: function () {
      // return { mouseDown: false, activeTool: ToolStore.get() };
      return { mouseDown: false };
    },

    toggleClick: function () {
      if (this.state.mouseDown) {
        this.setState({ mouseDown: false });
      } else {
        this.setState({ mouseDown: true });
      }
    },
    //
    // handleToolSelection: function (e) {
    //   // this.state.activeTool = ToolStore.get();
    //
    //   switch (this.state.activeTool) {
    //     case 'save':
    //       if (this.props.drawing.id) {
    //         ApiUtil.saveDrawing(this.props.drawing);
    //       } else {
    //         ApiUtil.saveNewDrawing(this.props.drawing);
    //       }
    //       break;
    //     case 'eraser':
    //       PaletteActions.receiveNewActiveColor('white');
    //       break;
    //   }
    // },

    handleLeavingCanvas: function () {
      this.setState({ mouseDown: false });
    },

    // componentDidMount: function () {
    //   ToolStore.addChangeListener(this.handleToolSelection);
    // },

    render: function () {
      var that = this;
      var canvas = that.props.drawing;
      var style = {width: ((canvas.size * 10) + (canvas.size * 2))};
      var cells = canvas.content;

      return (
        <div className="canvas"
             style={style}
             onMouseLeave={that.handleLeavingCanvas}>
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
