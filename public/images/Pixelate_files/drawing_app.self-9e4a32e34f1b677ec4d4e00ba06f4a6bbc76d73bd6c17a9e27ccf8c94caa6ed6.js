(function (root) {
  'use strict';
  root.DrawingApp = React.createClass({
    displayName: 'DrawingApp',

    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { drawing: null, isModalOpen: false, title: '', paintbucketOn: false, lastActiveColor: "#000000" };
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
    _turnOffPaintbucket: function () {
      this.state.paintbucketOn = false;
    },

    _initiateFetchingOfCanvas: function (id) {
      DrawingStore.addChangeListener(this._loadCanvas);
      if (id) {
        ApiUtil.loadSavedDrawing(id);
      } else {
        DrawingStore.addNewDrawingSaveListener(this._onSaveOfNewDrawing);
        ApiUtil.makeNewDrawing();
      }
    },

    componentDidMount: function () {
      this._initiateFetchingOfCanvas(this.props.params.id);
    },

    componentWillReceiveProps: function (newProps) {
      this._initiateFetchingOfCanvas(newProps.params.id);
    },

    componentWillUnmount: function () {
      document.getElementsByTagName('body')[0].className = "";
      DrawingStore.removeChangeListener(this._loadCanvas);
      DrawingStore.removeNewDrawingSaveListener(this._onSaveOfNewDrawing);
    },

    setCursor: function (toolName) {
      if (toolName !== 'save') {
        document.getElementsByTagName('body')[0].className = toolName + "-cursor";
      }
    },

    saveToCanvas: function (drawingTitle) {
      html2canvas($("#save-me"), { onrendered: (function (canvas) {
          // save this to the database
          this.state.drawing.data_url = canvas.toDataURL('image/png');
          if (this.state.drawing.id) {
            ApiUtil.saveDrawing(this.state.drawing);
          } else {
            this.state.drawing.title = drawingTitle;
            ApiUtil.saveNewDrawing(this.state.drawing);
          }
        }).bind(this)
      });
    },

    openModal: function () {
      this.setState({ isModalOpen: true });
    },

    closeModal: function (e) {
      e.preventDefault();
      var drawingTitle = React.findDOMNode(this.refs.drawingTitle).value;
      this.setState({ isModalOpen: false }, (function () {
        this.saveToCanvas(drawingTitle);
      }).bind(this, drawingTitle));
    },

    paintbucket: function (e) {
      if (this.state.paintbucketOn) {
        ToolActions.paintbucket($(e.target).attr('value'));
      }
    },

    handleToolSelection: function (tool) {
      this.setCursor(tool);
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
          this.setState({ paintbucketOn: false, lastActiveColor: ColorStore.get() }, PaletteActions.receiveNewActiveColor('#eee'));
          break;
        case 'paintbucket':
          this.setState({ paintbucketOn: true });
          break;
        case 'brush':
          this.setState({ paintbucketOn: false }, PaletteActions.receiveNewActiveColor(this.state.lastActiveColor));
          break;
      }
    },

    resetFlash: function () {
      var that = this;
      setTimeout(function () {
        that.setState({ message: null });
      }, 2000);
    },

    resetFlashEarly: function () {
      this.setState({ message: null });
    },

    renderFlashMessage: function () {
      var message;
      var that = this;
      if (this.state.message) {
        message = React.createElement(
          'div',
          { className: 'flash-message',
            onClick: this.resetFlashEarly,
            ref: this.resetFlash },
          this.state.message
        );
      }

      return message;
    },

    closeModalWithoutSave: function () {
      this.setState({ isModalOpen: false });
    },

    render: function () {
      var drawing = this.state.drawing;
      if (drawing) {
        var message = this.renderFlashMessage();
        var canvasSize = drawing.size * 10 + drawing.size * 2;
        var containerStyle = { width: canvasSize };

        return React.createElement(
          'div',
          { className: 'drawing-app' },
          message,
          React.createElement(
            Modal,
            { isOpen: this.state.isModalOpen,
              transitionName: 'modal-anim' },
            React.createElement(
              'div',
              { onClick: this.closeModalWithoutSave, className: 'close-modal' },
              'X'
            ),
            React.createElement(
              'h3',
              null,
              'Name your drawing!'
            ),
            React.createElement(
              'form',
              { onSubmit: this.closeModal, className: 'drawing-name-form' },
              React.createElement('input', { name: 'title', type: 'text', ref: 'drawingTitle' }),
              React.createElement(
                'button',
                { value: 'Submit' },
                'Save'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'app-title' },
            'Pixelate'
          ),
          React.createElement(
            'div',
            { className: 'center-canvas-and-palette', style: containerStyle },
            React.createElement(Canvas, { paintbucket: this.paintbucket, drawing: drawing, paintbucketOn: this.state.paintbucketOn }),
            React.createElement(Palette, null)
          ),
          React.createElement(Tools, { handleToolSelection: this.handleToolSelection })
        );
      } else {
        return React.createElement(
          'div',
          { className: 'loading-page' },
          React.createElement(Spinner, { spinnerName: 'cube-grid pulse' })
        );
      }
    }
  });
})(this);