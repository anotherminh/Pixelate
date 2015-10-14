(function(root) {
  'use strict';
  var tools = ["save", "eraser"];
  root.Tools = React.createClass({
    render: function () {
      return (
        <div className="tools-container">
          {
            tools.map(function(toolType, idx) {
              return (<Tool key={idx} toolType={toolType}/>);
            })
          }
        </div>
      );
    }
  });
}(this));
