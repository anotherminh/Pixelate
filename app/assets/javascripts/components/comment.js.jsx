(function(root) {
  'use strict';
  root.Comment = React.createClass({
    render: function () {
      var comment = this.props.comment;
      return (
        <div className="comment">
          <div className="author">Author: {comment.author}</div>
          <div className="body">Body: {comment.body}</div>
        </div>
      );
    }
  });
}(this));
