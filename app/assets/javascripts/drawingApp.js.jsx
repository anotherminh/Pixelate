var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var DrawingApp = React.createClass({
  getInitialState: function () {
    return { drawing: null };
  },

  _onChange: function () {
    this.setState({ drawing: DrawingsStore.get() });
  },

  componentDidMount: function () {
    DrawingsStore.addChangeListener(this._onChange);
    this.loadSavedDrawing();
  },

  loadSavedDrawing: function () {
    ApiUtil.loadSavedDrawing(this.props.params.id);
  },

  render: function () {
    if (this.state.drawing) {
      return <Canvas drawing={this.state.drawing}/>;
    } else {
      return <div>Not yet loaded!</div>;
    }
  }
});

var routes = (
    <Route path="/drawings/:id" component={DrawingApp}/>
);

$(document).ready(
  function () {
    React.render(<Router>{routes}</Router>, document.getElementById('content'));
  }
);
