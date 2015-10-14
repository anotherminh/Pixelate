(function(root) {
  'use strict';
  root.UserDetails = React.createClass({
    getInitialState: function () {
      return { user: UserStore.get() };
    },

    _onChange: function () {
      this.setState({ user: UserStore.get() });
    },

    componentWillReceiveProps: function (newProps) {
      console.log("fetching another user");
      ApiUtil.fetchUserDetails(newProps.params.id);
    },

    componentDidMount: function () {
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchUserDetails(this.props.params.id);
    },

    componentWillUnmount: function () {
      UserStore.removeChangeListener(this._onChange);
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
