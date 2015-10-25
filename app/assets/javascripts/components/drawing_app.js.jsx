(function(root) {
  'use strict';
  var _keys = {};

  root.DrawingApp = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { drawing: null,
               isModalOpen: false,
               title: '',
               paintbucketOn: false,
               lastActiveColor: "#000000",
               showHelp: false };
    },

    _loadCanvas: function () {
      this.setState({ drawing: DrawingStore.get(), message: DrawingStore.message() });
    },

    _onSaveOfNewDrawing: function () {
      this.setState({ drawing: DrawingStore.get(), message: DrawingStore.message() }, function () {
        var url = '/drawings/' + DrawingStore.get().id;
        this.history.pushState(null, url);
      });
    },

    // works for both fetching a brand new (not in db) canvas,
    // as well as a saved one
    _initiateFetchingOfCanvas: function (id) {
      DrawingStore.addChangeListener(this._loadCanvas);
      if (id) {
        ApiUtil.loadSavedDrawing(id);
      } else {
        DrawingStore.addNewDrawingSaveListener(this._onSaveOfNewDrawing);
        ApiUtil.makeNewDrawing();
      }
    },

    UndoChange: function () {
      ApiActions.UndoDrawing(HistoryStore.getLastState());
    },

    _keysDown: function (e) {
      var keyValue = parseInt(e.keyCode);

      if (keyValue === 90 || (keyValue === 17 || keyValue === 91)) {
        _keys[keyValue] = true;
      } else if (keyValue === 66) {
        this.handleToolSelection("brush");
      } else if (keyValue === 69) {
        this.handleToolSelection("eraser");
      } else if (keyValue === 80) {
        this.handleToolSelection("paintbucket");
      } else if (keyValue === 71) {
        this.handleToolSelection("grid");
      }

      if (_keys[90] && (_keys[17] || _keys[91])) {
        this.UndoChange();
        _keys = {};
      }
    },

    addShortcutListener: function () {
      window.addEventListener("keydown", this._keysDown);
    },

    componentDidMount: function () {
      this.setCursor("brush");

      this.addShortcutListener();
      this._initiateFetchingOfCanvas(this.props.params.id);
    },

    componentWillReceiveProps: function (newProps) {
      this._initiateFetchingOfCanvas(newProps.params.id);
    },

    componentWillUnmount: function () {
      document.getElementsByTagName('body')[0].className= "";
      DrawingStore.removeChangeListener(this._loadCanvas);
      DrawingStore.removeNewDrawingSaveListener(this._onSaveOfNewDrawing);
    },

    setCursor: function (toolName) {
      if (toolName !== 'save') {
        document.getElementsByTagName('body')[0].className = (toolName + "-cursor");
      }
    },

    saveToCanvas: function (drawingTitle) {
      document.getElementsByTagName('body')[0].className = ("wait-cursor");
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

    fillArea: function (e) {
      if (this.state.paintbucketOn) {
        ToolActions.paintbucket($(e.target).attr('value'));
      }
    },

    handleToolSelection: function (tool, opts) {
      this.setCursor(tool);
      switch (tool) {
        case 'save':
          if (this.state.drawing.id) {
            setCursor("wait");
            this.saveToCanvas();
          } else {
            this.openModal();
          }
          break;
        case 'download':
          var dataUrl = this.state.drawing.data_url;
          if (dataUrl) {
            window.open(this.state.drawing.data_url);
          } else {
            html2canvas($("#save-me"), {onrendered: function(canvas) {
                window.open(canvas.toDataURL('image/png'));
              }
            });
          }
          break;
        case 'grid':
          ApiActions.toggleGrid();
          break;
        case 'eraser':
          this.setState(
            { paintbucketOn: false, lastActiveColor: ColorStore.get() },
            PaletteActions.receiveNewActiveColor('#eee')
          );
          break;
        case 'paintbucket':
          this.setState({ paintbucketOn: true },
            function () {
              if (ColorStore.get() === "#eee") {
                PaletteActions.receiveNewActiveColor(this.state.lastActiveColor);
              }
            }
          );
          break;
        case 'brush':
          this.setState(
            { paintbucketOn: false },
            function () {
              if (ColorStore.get() === "#eee") {
                PaletteActions.receiveNewActiveColor(this.state.lastActiveColor);
              }
            }
          );
          break;
        case 'question':
          if (this.state.showHelp) {
            this.setState({ showHelp: false });
          } else {
            this.setState({ showHelp: true });
          }
          break;
      }
    },

    resetFlash: function () {
      var that = this;
      setTimeout(function () { that.setState({ message: null }); }, 4000);
    },

    resetFlashEarly: function () {
      this.setState({ message: null });
    },

    renderFlashMessage: function () {
      var message;
      var that = this;
      if (this.state.message) {
        document.getElementsByTagName('body')[0].className= "";
        message = (
          <div className="flash-message"
               onClick={this.resetFlashEarly}
               ref={this.resetFlash}>
            {this.state.message}
          </div>
        );
      }

      return message;
    },

    closeModalWithoutSave: function () {
      this.setState({ isModalOpen: false });
    },

    renderHelpModal: function () {
      var helpBox;
      if (this.state.showHelp) {
        helpBox = (
          <div className="helpbox">
            <div className="helpbox-title">Shortcuts</div>
            <p>Undo: Ctrl (⌘) + z</p>
            <p>Brush: B</p>
            <p>Paintbucket: P</p>
            <p>Eraser: E</p>
            <p>Toggle-grid: G</p>
          </div>
        );
      }
      return helpBox;
    },

    render: function () {
      var drawing = this.state.drawing;
      if (drawing) {
        var message = this.renderFlashMessage();
        var canvasSize = ((drawing.size * 10) + (drawing.size * 2));
        var containerStyle = { width: canvasSize };
        var HelpModal = this.renderHelpModal();

        return (
          <div className="drawing-app">
            {message}
            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim">
              <div onClick={this.closeModalWithoutSave} className="close-modal">X</div>
              <h3>Name your drawing!</h3>
              <form onSubmit={this.closeModal} className="drawing-name-form">
                <input name="title" type="text" ref="drawingTitle"/>
                <button value="Submit">Save</button>
              </form>
            </Modal>

            {HelpModal}
            <div className="app-title">Pixelate</div>
            <div className="center-canvas-and-palette" style={containerStyle}>
              <Canvas fillArea={this.fillArea}
                      drawing={drawing}
                      brushSize={this.state.brushSize}
                      paintbucketOn={this.state.paintbucketOn}/>
              <Palette paintbucketOn={this.state.paintbucketOn}/>
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
