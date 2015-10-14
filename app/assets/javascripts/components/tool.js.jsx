(function(root) {
  'use strict';
  root.Tool = React.createClass({
    handleClick: function () {
      this.props.handleToolSelection(this.props.toolType);
    },

    render: function () {
      var icon_url = '/images/' + this.props.toolType + '.png';

      return (
        <img onClick={this.handleClick} className="tool" src={icon_url}/>
      );
    }
  });
}(this));
