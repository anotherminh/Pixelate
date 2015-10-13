(function(root) {
  'use strict';
  var _colors = [
      'red', 'cornflowerblue', 'forestgreen', 'wheat', '#ccc', 'white',
      'black', 'pink', 'purple'
  ];

  root.Palette = React.createClass({
    render: function () {
      return (
        <div className="palette">
          {
            _colors.map(function (color, idx) {
              return (<Swatch key={idx} color={color}/>);
            })
          }
        </div>
      );
    }
  });
}(this));
