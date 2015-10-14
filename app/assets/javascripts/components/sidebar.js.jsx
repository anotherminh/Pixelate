(function(root) {
  'use strict';
  root.Sidebar = React.createClass({
    getInitialState: function () {
      return { show: false };
    },

    handleHover: function () {
      this.setState( { show: true } );
    },

    handleMouseLeave: function () {
      this.setState( { show: false } );
    },

    render: function () {
      if (this.state.show) {
        return (
          <div className="sidebar-show"
               onMouseOver={this.handleHover}
               onMouseLeave={this.handleMouseLeave}>
            <ul className="nav-menu">
              <li><div>My Profile</div></li>
              <li><div>Browse</div></li>
              <li><div>Drawing App</div></li>
              <li><div>Search</div></li>
              <li><LogOutButton/></li>
            </ul>
            <div className="sidebar-show-triangle-left"></div>
            <div className="sidebar-show-triangle-right"></div>
            <div className="sidebar-show-decor"></div>
          </div>
        );
      } else {
        return (
          <div className="sidebar-hide"
               onMouseOver={this.handleHover}
               onMouseLeave={this.handleMouseLeave}>
            <div className="sidebar-triangle-left"></div>
            <div className="sidebar-triangle-right"></div>
            <div className="decor"></div>
          </div>
        );
      }

    }
  });
}(this));
