(function(root) {
  'use strict';
  root.DrawingDetails = React.createClass({
    getInitialState: function () {
      return { drawing: null };
    },

    _onChange: function () {
      this.setState({ drawing: DrawingStore.get() }, function () {
      });
    },

    _fetchCanvas: function (id) {
      ApiUtil.loadSavedDrawing(id);
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

    render: function () {
      var drawing = this.state.drawing;
      if (drawing) {
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
                <p className="info artist-name">
                  Artist: {drawing.username}
                </p>
                <p className="info">
                  Kudos: {drawing.kudos.count ? drawing.kudos.count : "0"}
                </p>
              </div>
            </div>
            <div className="comments-container">
              <CommentForm drawingId={drawing.id}/>
              <div className="comments">
                {drawing.comments.map(function (comment) {
                  return <Comment key={comment.id} comment={comment}/>;
                })}
              </div>
            </div>
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
