(function (root) {
  'use strict';

  root.Comment = React.createClass({
    displayName: "Comment",

    deleteDrawing: function (e) {
      e.stopPropagation();
      ApiUtil.deleteComment(this.props.comment.id);
    },

    render: function () {
      var DeleteButton;
      var comment = this.props.comment;

      if (current_user_id == comment.user_id) {
        DeleteButton = React.createElement("div", { onClick: this.deleteDrawing, className: "comment-delete-button" });
      }

      return React.createElement(
        "div",
        { className: "comment" },
        React.createElement(
          "div",
          { className: "author" },
          "Author: ",
          comment.author,
          React.createElement(
            "span",
            { className: "timestamp" },
            comment.created_at
          )
        ),
        React.createElement(
          "div",
          { className: "body" },
          comment.body
        ),
        DeleteButton
      );
    }
  });
})(this);