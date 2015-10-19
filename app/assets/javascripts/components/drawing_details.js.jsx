(function(root) {
  'use strict';
  root.DrawingDetails = React.createClass({
    getInitialState: function () {
      return { drawing: null, showComments: false };
    },

    _onChange: function () {
      this.setState({ drawing: DrawingStore.get() }, function () {
      });
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
        this.setState({ showComments: true }, function () { root.scrollTo(0, document.body.scrollHeight); });
      }
    },

    renderComments: function () {
      var commentsComponent, drawing = this.state.drawing;
      if (this.state.showComments) {
        commentsComponent = (
          <div className="comments-container">
            <CommentForm drawingId={drawing.id}/>
            <div className="comments">
              {drawing.comments.map(function (comment) {
                return <Comment key={comment.id} comment={comment}/>;
              })}
            </div>
          </div>
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

      showButton = (
        <div className="info show-comments-button" onClick={this.showComments}>
          {text}
        </div>
      );

      return showButton;
    },

    render: function () {
      var drawing = this.state.drawing;
      if (drawing) {
        var comments = this.renderComments();
        var commentButton = this.renderShowCommentButton();
        var canvasSize = ((drawing.size * 10) + (drawing.size * 2));
        var containerStyle = { width: canvasSize };
        return (
          <div>
            <div className="drawing-details-container" style={containerStyle}>
              <MoreDrawingButton drawingId={drawing.id - 1} name="Previous"/>
              <MoreDrawingButton drawingId={drawing.id + 1} name="Next"/>
              <ShowCanvas drawing={drawing}/>
              <div className="stats-container">
                <p className="drawing-title">Title: {drawing.title}</p>
                <span className="artist-name">
                  by: {drawing.username}
                </span>
                <p className="info">
                  Kudos: {drawing.kudos.count ? drawing.kudos.count : "0"}
                </p>
                {commentButton}
              </div>
            </div>
            {comments}
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
