(function (root) {
  'use strict';
  root.ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

  root.Modal = React.createClass({
    displayName: "Modal",

    render: function () {
      if (this.props.isOpen) {
        return React.createElement(
          ReactCSSTransitionGroup,
          { transitionName: this.props.transitionName },
          React.createElement(
            "div",
            { className: "modal" },
            this.props.children
          ),
          React.createElement("div", { className: "blur-background" })
        );
      } else {
        return React.createElement(ReactCSSTransitionGroup, { transitionName: this.props.transitionName });
      }
    }
  });
})(this);