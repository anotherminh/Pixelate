(function(root) {
  'use strict';
  root.Cell = React.createClass({
    getInitialState: function() {
      return { active: 0 };
    },

    handleMouseDown: function () {
      this.setState({ active: 1 });
      this.props.handleMouseDown();
    },

    handleMouseUp: function () {
      this.props.handleMouseUp();
    },

    mouseOver: function(e) {
      if (this.props.mouseDown) {
        this.setState({active: 1});
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
      if (this.state.active === 1 && !this.props.paintbucketOn) {
        this.props.cell.style.backgroundColor = ColorStore.get();
        this.state.active++; //updates to 2
      } else if (this.props.paintbucketOn) {
        this.state.active++; //updates to 2
      }

      var klass = this.calculateCellClass();

      return (
        <div className={klass}
             style={cell.style}
             value={this.props.idx}
             onMouseDown={this.handleMouseDown}
             onMouseUp={this.handleMouseUp}
             onMouseOver={this.mouseOver}>
        </div>
      );
    }
  });
}(this));
