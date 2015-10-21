(function (root) {
  'use strict';
  root.Sidebar = React.createClass({
    displayName: "Sidebar",

    getInitialState: function () {
      return { show: false };
    },

    handleHover: function () {
      this.setState({ show: true });
    },

    handleMouseLeave: function () {
      this.setState({ show: false });
    },

    render: function () {
      if (this.state.show) {
        return React.createElement(
          "div",
          { className: "sidebar show",
            onMouseOver: this.handleHover,
            onMouseLeave: this.handleMouseLeave },
          React.createElement(
            "ul",
            { className: "nav-menu" },
            React.createElement(
              "li",
              { className: "sidebar-button" },
              React.createElement(ProfileButton, null)
            ),
            React.createElement(
              "li",
              { className: "sidebar-button" },
              React.createElement(BrowseButton, null)
            ),
            React.createElement(
              "li",
              { className: "sidebar-button" },
              React.createElement(DrawingAppButton, null)
            ),
            React.createElement(
              "li",
              { className: "sidebar-button" },
              React.createElement(SearchButton, null)
            ),
            React.createElement(
              "li",
              { className: "sidebar-button" },
              React.createElement(LogOutButton, null)
            )
          ),
          React.createElement("div", { className: "sidebar-show-triangle-left" }),
          React.createElement("div", { className: "sidebar-show-triangle-right" }),
          React.createElement("div", { className: "sidebar-show-decor" })
        );
      } else {
        return React.createElement(
          "div",
          { className: "sidebar hide",
            onMouseOver: this.handleHover,
            onMouseLeave: this.handleMouseLeave },
          React.createElement("div", { className: "sidebar-triangle-left" }),
          React.createElement("div", { className: "sidebar-triangle-right" }),
          React.createElement("div", { className: "decor" })
        );
      }
    }
  });
})(this);