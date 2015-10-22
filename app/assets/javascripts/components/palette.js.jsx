(function(root) {
  'use strict';
  var _colors = [
      '#FF0000', '#6495ED', '#228B22', '#F5DEB3', '#D2691E', '#FFFFFF',
      '#000000', '#FFC0CB', '#800080'
  ];


  root.Palette = React.createClass({
    resetCursor: function () {
      if (this.props.paintbucketOn) {
        document.getElementsByTagName('body')[0].className = ("paintbucket-cursor");
      } else {
        document.getElementsByTagName('body')[0].className = ("brush-cursor");
      }
    },

    render: function () {
      return (
        <div className="palette">
          {
            _colors.map(function (color, idx) {
              return (<ColorPicker key={idx}
                                   defaultColor={color}
                                   resetCursor={this.resetCursor}/>);
            }.bind(this))
          }
        </div>
      );
    }
  });
}(this));
