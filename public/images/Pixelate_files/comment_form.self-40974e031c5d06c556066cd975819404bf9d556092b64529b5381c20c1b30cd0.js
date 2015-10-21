(function (root) {
  'use strict';
  var LinkedStateMixin = React.addons.LinkedStateMixin;

  root.CommentForm = React.createClass({
    displayName: "CommentForm",

    mixins: [LinkedStateMixin],
    getInitialState: function () {
      return { commentBody: "" };
    },

    _clearForm: function () {
      this.setState({ commentBody: "" });
    },

    componentDidMount: function () {
      DrawingStore.addChangeListener(this._clearForm);
    },

    componentWillUnMount: function () {
      DrawingStore.removeChangeListener(this._clearForm);
    },

    submitPost: function (e) {
      e.preventDefault();
      ApiUtil.postComment(this.props.drawingId, this.state.commentBody);
    },

    render: function () {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { className: "comment-form" },
          React.createElement(
            "label",
            null,
            "Comment:"
          ),
          React.createElement("br", null),
          React.createElement("textarea", { valueLink: this.linkState('commentBody') }),
          React.createElement("br", null),
          React.createElement(
            "button",
            {
              className: "submit-comment",
              onClick: this.submitPost, type: "submit" },
            "Submit"
          )
        )
      );
    }
  });
})(this);