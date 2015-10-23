(function(root) {
  'use strict';
  root.Cell = React.createClass({
    getInitialState: function() {
      return {};
    },

    handleMouseDown: function () {
      // doesn't check to see if brush size is on
      if (!this.props.paintbucketOn) {
        var x = this.props.cell.id % 50;
        var y = Math.floor(this.props.cell.id / 50);
        this.props.handleMouseDown();
        root.setPreviousCell([x, y]);
      } else {
        this.props.handleMouseDown();
      }
    },

    handleMouseUp: function () {
      this.props.handleMouseUp();
    },

    mouseOver: function(e) {
      if (this.props.mouseDown) {
        var x = this.props.cell.id % 50;
        var y = Math.floor(this.props.cell.id / 50);
        root.handleNewCoord([x, y]);
      }
    },

    calculateCellClass: function () {
      if (DrawingStore.gridStatus()) {
        return "cell border-on";
      } else {
        return "cell border-off";
      }
    },

    render: function () {
      var cell = this.props.cell;

      var klass = this.calculateCellClass();

      return (
        <div className={klass}
             style={cell.style}
             id={this.props.idx}
             value={this.props.idx}
             onMouseDown={this.handleMouseDown}
             onMouseUp={this.handleMouseUp}
             onMouseEnter={this.mouseOver}>
        </div>
      );
    }
  });
}(this));
