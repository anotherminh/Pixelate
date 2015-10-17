(function(root) {
  'use strict';
  root.ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

  root.Modal = React.createClass({
      render: function() {
          if(this.props.isOpen){
              return (
                <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
                  <div className="modal">
                    {this.props.children}
                  </div>
                </ReactCSSTransitionGroup>
              );
          } else {
              return <ReactCSSTransitionGroup transitionName={this.props.transitionName} />;
          }
      }
  });
}(this));
