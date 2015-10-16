(function(root) {
  'use strict';
  root.MoreDrawingButton = React.createClass({
    mixins: [ReactRouter.History],

    handleClick: function() {
      var url = "/drawing_details/" + this.props.drawingId;
      this.history.pushState(null, url);
    },

    render: function () {
      var max_drawings = DrawingsStore.all().count;
      if (max_drawings >= this.props.drawingId || this.props.drawingId >= 1) {
        var content, klass = "more-drawing-button";
        if (this.props.name === "Previous") {
          content = "<";
          klass += " left";
        } else {
          content = ">";
          klass += " right";
        }

        return (
          <div className={klass} onClick={this.handleClick}>
            {content}
          </div>
        );
      } else {
        return <div></div>;
      }

    }
  });
}(this));
