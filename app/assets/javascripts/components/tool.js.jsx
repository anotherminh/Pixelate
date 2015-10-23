(function(root) {
  'use strict';
  root.Tool = React.createClass({
    handleClick: function () {
      this.props.handleToolSelection(this.props.toolType);
    },

    hoverOverComponent: function () {
      var sizeOpts;
      if (this.props.toolType === 'brush' || this.props.toolType === 'eraser') {
        sizeOpts = (
          <div className="size-opts">
            <div className="small"></div>
            <div className="medium"></div>
            <div className="large"></div>
          </div>
        );
      }

      return sizeOpts;
    },

    render: function () {
      var icon_url = '/images/' + this.props.toolType + '.png';

      return (
        <div className="tool-wrap">
          {this.hoverOverComponent()}
          <img onClick={this.handleClick}
               onHover={this.handleHover}
               className="tool"
               src={icon_url}/>
        </div>
      );
    }
  });
}(this));
