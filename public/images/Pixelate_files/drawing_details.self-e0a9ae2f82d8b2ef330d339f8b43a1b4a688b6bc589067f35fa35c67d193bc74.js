(function (root) {
  'use strict';
  root.DrawingDetails = React.createClass({
    displayName: "DrawingDetails",

    getInitialState: function () {
      return { drawing: null, showComments: false };
    },

    _onChange: function () {
      this.setState({ drawing: DrawingStore.get() }, function () {});
    },

    _fetchCanvas: function (id) {
      ApiUtil.loadDrawingShow(id);
    },

    componentDidMount: function () {
      DrawingStore.addChangeListener(this._onChange);
      this._fetchCanvas(this.props.params.id);
    },

    componentWillReceiveProps: function (newProps) {
      this._fetchCanvas(newProps.params.id);
    },

    componentWillUnmount: function () {
      DrawingStore.removeChangeListener(this._onChange);
    },

    showComments: function () {
      if (this.state.showComments) {
        this.setState({ showComments: false });
      } else {
        this.setState({ showComments: true }, function () {
          root.scrollTo(0, document.body.scrollHeight);
        });
      }
    },

    renderComments: function () {
      var commentsComponent,
          drawing = this.state.drawing;
      if (this.state.showComments) {
        commentsComponent = React.createElement(
          "div",
          { className: "comments-container" },
          React.createElement(CommentForm, { drawingId: drawing.id }),
          React.createElement(
            "div",
            { className: "comments" },
            drawing.comments.map(function (comment) {
              return React.createElement(Comment, { key: comment.id, comment: comment });
            })
          )
        );
      }

      return commentsComponent;
    },

    renderShowCommentButton: function () {
      var text, showButton;
      if (this.state.showComments) {
        text = "Hide Comments";
      } else {
        text = "Show Comments";
      }

      showButton = React.createElement(
        "div",
        { className: "info show-comments-button", onClick: this.showComments },
        text
      );

      return showButton;
    },

    render: function () {
      var drawing = this.state.drawing;
      if (drawing) {
        var comments = this.renderComments();
        var commentButton = this.renderShowCommentButton();
        var canvasSize = drawing.size * 10 + drawing.size * 2;
        var containerStyle = { width: canvasSize };
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "drawing-details-container", style: containerStyle },
            React.createElement(MoreDrawingButton, { drawingId: drawing.id - 1, name: "Previous" }),
            React.createElement(MoreDrawingButton, { drawingId: drawing.id + 1, name: "Next" }),
            React.createElement(ShowCanvas, { drawing: drawing }),
            React.createElement(
              "div",
              { className: "stats-container" },
              React.createElement(
                "p",
                { className: "drawing-title" },
                drawing.title
              ),
              React.createElement(
                "span",
                { className: "artist-name" },
                "by: ",
                drawing.username
              ),
              React.createElement(
                "p",
                { className: "info" },
                "Kudos: ",
                drawing.kudos.length ? drawing.kudos.length : "0"
              ),
              commentButton
            )
          ),
          comments
        );
      } else {
        return React.createElement(
          "div",
          { className: "loading-page" },
          React.createElement(Spinner, { spinnerName: "cube-grid pulse" })
        );
      }
    }
  });
})(this);