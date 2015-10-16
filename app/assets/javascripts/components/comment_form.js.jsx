(function(root) {
  'use strict';
  var LinkedStateMixin = React.addons.LinkedStateMixin;

  root.CommentForm = React.createClass({
    mixins: [LinkedStateMixin, ReactRouter.History],
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
      return (
         <div>
          <form className="comment-form">
            <label>Comment:</label><br/>
            <textarea valueLink={this.linkState('commentBody')}/><br/>
            <button
              className="submit-comment"
              onClick={this.submitPost} type="submit">
              Submit
            </button>
          </form>
        </div>
      );
    }
  });
}(this));
