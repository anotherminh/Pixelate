(function(root) {
  'use strict';

  root.Comment = React.createClass({
    deleteDrawing: function (e) {
      e.stopPropagation();
      ApiUtil.deleteComment(this.props.comment.id);
    },

    render: function () {
      var DeleteButton;
      var comment = this.props.comment;

      if (current_user_id == comment.user_id) {
        DeleteButton = (
          <div onClick={this.deleteDrawing} className="comment-delete-button"></div>
        );
      }

      return (
        <div className="comment">
          <div className="author">Author: {comment.author}
            <span className="timestamp">{comment.created_at}</span>
          </div>
          <div className="body">{comment.body}</div>
          {DeleteButton}
        </div>
      );
    }
  });
}(this));
