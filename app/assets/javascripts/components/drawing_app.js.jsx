(function(root) {
  'use strict';
  root.DrawingApp = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { drawing: null, activeTool: ToolStore.get(), isModalOpen: false, title: '' };
    },

    _loadCanvas: function () {
      this.setState({ drawing: DrawingStore.get() });
    },

    _onSaveOfNewDrawing: function () {
      this.setState({ drawing: DrawingStore.get() }, function () {
        var url = '/drawings/' + DrawingStore.get().id;
        this.history.pushState(null, url);
      });
    },
    // works for both fetching a brand new (not in db) canvas,
    // as well as a saved one
    _initiateFetchingOfCanvas: function () {
      DrawingStore.addChangeListener(this._loadCanvas);
      if (this.props.params.id) {
        ApiUtil.loadSavedDrawing(this.props.params.id);
      } else {
        DrawingStore.addNewDrawingSaveListener(this._onSaveOfNewDrawing);
        ApiUtil.makeNewDrawing(this.props.params.id);
      }
    },

    componentDidMount: function () {
      this._initiateFetchingOfCanvas();
      ToolStore.addChangeListener(this.handleToolSelection);
    },

    componentWillReceiveProps: function (newProps) {
      this._initiateFetchingOfCanvas();
    },

    componentWillUnmount: function () {
      ToolStore.removeChangeListener(this.handleToolSelection);
      DrawingStore.removeChangeListener(this._loadCanvas);
      DrawingStore.removeChangeListener(this._onSaveOfNewDrawing);
    },

    saveToCanvas: function (drawingTitle) {
      html2canvas($("#save-me"), {onrendered: function(canvas) {
          // save this to the database
          this.state.drawing.data_url = canvas.toDataURL('image/png');
          if (this.state.drawing.id) {
            ApiUtil.saveDrawing(this.state.drawing);
          } else {
            this.state.drawing.title = drawingTitle;
            ApiUtil.saveNewDrawing(this.state.drawing);
          }
        }.bind(this)
      });
    },

    openModal: function() {
         this.setState({ isModalOpen: true });
     },

     closeModal: function(e) {
        e.preventDefault();
        var drawingTitle = React.findDOMNode(this.refs.drawingTitle).value;
        this.setState({ isModalOpen: false }, function () { this.saveToCanvas(drawingTitle); }.bind(this, drawingTitle) );
     },

    handleToolSelection: function (tool) {
      this.state.activeTool = ToolStore.get();
      switch (tool) {
        case 'save':
          if (this.state.drawing.id) {
            this.saveToCanvas();
          } else {
            this.openModal();
          }
          // this.saveToCanvas();
          console.log("parsed data url successfully");
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
            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim">
              <h3>Name your drawing!</h3>
              <form onSubmit={this.closeModal} className="drawing-name-form">
                <input name="title" type="text" ref="drawingTitle"/>
                <button value="Submit">Save</button>
              </form>
            </Modal>
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
            <Spinner spinnerName='cube-grid pulse'/>
          </div>
        );
      }
    }
  });
}(this));
