(function(root) {
  'use strict';
  root.DrawingApp = React.createClass({
    mixins: [ReactRouter.History],


    getInitialState: function () {
      return { drawing: null, activeTool: ToolStore.get() };
    },

    _loadCanvas: function () {
      this.setState({ drawing: DrawingsStore.get() });
    },

    _onSaveOfNewDrawing: function () {
      this.setState({ drawing: DrawingsStore.get() }, function () {
        var url = '/drawings/' + DrawingsStore.get().id;
        this.history.pushState(null, url);
      });
    },
    // works for both fetching a brand new (not in db) canvas,
    // as well as a saved one
    _initiateFetchingOfCanvas: function () {
      DrawingsStore.addChangeListener(this._loadCanvas);
      if (this.props.params.id) {
        ApiUtil.loadSavedDrawing(this.props.params.id);
      } else {
        DrawingsStore.addNewDrawingSaveListener(this._onSaveOfNewDrawing);
        ApiUtil.makeNewDrawing(this.props.params.id);
      }
    },

    componentDidMount: function () {
      this._initiateFetchingOfCanvas();
      ToolStore.addChangeListener(this.handleToolSelection);
    },

    componentWillReceiveProps: function (newProps) {
      console.log(newProps);
      ApiUtil.loadSavedDrawing(newProps.params.id);
    },

    componentWillUnmount: function () {
      ToolStore.removeChangeListener(this.handleToolSelection);
      DrawingsStore.removeChangeListener(this._loadCanvas);
      DrawingsStore.removeChangeListener(this._onSaveOfNewDrawing);
    },

    handleToolSelection: function (tool) {
      this.state.activeTool = ToolStore.get();
      switch (tool) {
        case 'save':
          if (this.state.drawing.id) {
            ApiUtil.saveDrawing(this.state.drawing);
          } else {
            ApiUtil.saveNewDrawing(this.state.drawing);
          }
          break;
        case 'eraser':
          PaletteActions.receiveNewActiveColor('#eee');
          break;
      }
    },

    render: function () {
      var drawing = this.state.drawing;
      if (drawing) {
        var canvasSize = ((drawing.size * 10) + (drawing.size * 2));
        var containerStyle = { width: canvasSize };
        return (
          <div className="drawing-app">
            <div className="app-title">Pixelate</div>
            <div className="center-canvas-and-palette" style={containerStyle}>
              <Canvas drawing={drawing}/>
              <Palette/>
            </div>
            <Tools handleToolSelection={this.handleToolSelection}/>
          </div>
        );
      } else {
        return (
          <div className="loading-page">
            <Spinner spinnerName='cube-grid pulse'/>;
          </div>
        );
      }
    }
  });
}(this));
