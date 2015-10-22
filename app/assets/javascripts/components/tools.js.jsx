(function(root) {
  'use strict';
  var tools = ["brush", "eraser", "paintbucket", "save", "download"];
  root.Tools = React.createClass({
    render: function () {
      var that = this;
      return (
        <div className="tools-container">
          {
            tools.map(function(toolType, idx) {
              return (<Tool key={idx} toolType={toolType} handleToolSelection={that.props.handleToolSelection}/>);
            })
          }
        </div>
      );
    }
  });
}(this));
