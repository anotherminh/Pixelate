var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var DrawingApp = React.createClass({
  getInitialState: function () {
    return { drawing: null };
  },

  _loadCanvas: function () {
    this.setState({ drawing: DrawingsStore.get() });
  },

  componentDidMount: function () {
    DrawingsStore.addChangeListener(this.loadDrawing);
    this.loadDrawing();
  },

  loadDrawing: function () {
    if (this.props.params.id) {
      ApiUtil.loadSavedDrawing(this.props.params.id);
    } else {
      debugger
      ApiUtil.makeNewDrawing(this.props.params.id);
    }
  },

  render: function () {
    if (this.state.drawing) {
      return (
        <div className="drawing-app">
          <Canvas drawing={this.state.drawing}/>
          <Palette/>
          <Tools/>
        </div>
      );
    } else {
      return <div>Not yet loaded!</div>;
    }
  }
});

var routes = (
  <Route>
    <Route path="/drawings/new" component={DrawingApp}/>
    <Route path="/drawings/:id" component={DrawingApp}/>
  </Route>
);

$(document).ready(
  function () {
    React.render(<Router>{routes}</Router>, document.getElementById('content'));
  }
);
