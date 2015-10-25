(function(root) {
  'use strict';
  root.Tool = React.createClass({
    handleClick: function () {
      this.props.handleToolSelection(this.props.toolType);
    },

    //the groundwork for handling brush sizes (css done):

    // handleSizeSelection: function (e) {
    //   e.stopPropagation();
    //   var toolType = this.props.toolType;
    //   var sizeChosen = e.currentTarget.className;
    //   this.props.handleToolSelection(toolType, sizeChosen);
    // },

    // hoverOverComponent: function () {
    //   var sizeOpts;
    //   if (this.props.toolType === 'brush' || this.props.toolType === 'eraser') {
    //     sizeOpts = (
    //       <div className="size-opts" onClick={this.handleClick}>
    //         <div onClick={this.handleSizeSelection} className="small"></div>
    //         <div onClick={this.handleSizeSelection} className="medium"></div>
    //         <div onClick={this.handleSizeSelection} className="large"></div>
    //       </div>
    //     );
    //   }
    //
    //   return sizeOpts;
    // },

    render: function () {
      var icon_url = '/images/' + this.props.toolType + '.png';

      return (
        <div className="tool-wrap">
          <img onClick={this.handleClick}
               onHover={this.handleHover}
               className="tool"
               src={icon_url}/>
        </div>
      );
    }
  });
}(this));
