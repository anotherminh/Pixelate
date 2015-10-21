(function (root) {
  'use strict';
  root.Tool = React.createClass({
    displayName: 'Tool',

    handleClick: function () {
      this.props.handleToolSelection(this.props.toolType);
    },

    render: function () {
      var icon_url = '/images/' + this.props.toolType + '.png';

      return React.createElement('img', { onClick: this.handleClick, className: 'tool', src: icon_url });
    }
  });
})(this);