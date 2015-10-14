(function(root) {
  'use strict';
  root.UserDetails = React.createClass({
    getInitialState: function () {
      return { user: UserStore.get() };
    },

    _onChange: function () {
      this.setState({ user: UserStore.get() });
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchUserDetails(this.props.params.id);
    },

    render: function () {
      return(
        <div>
          {this.state.user}
        </div>
      );
    }
  });
}(this));
