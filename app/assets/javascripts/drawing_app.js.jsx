var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var DrawingApp = React.createClass({
  mixins: [ReactRouter.History],


  getInitialState: function () {
    return { drawing: null };
  },

  _loadCanvas: function () {
    this.setState({ drawing: DrawingsStore.get() });
  },

  _onSaveOfNewDrawing: function () {
    this.setState({ drawing: DrawingsStore.get() }, function () {
      var url = '/drawings/' + DrawingsStore.get().id;
      this.history.pushState(null, url);
    });
  },
  // works for both fetching a brand new (not in db) canvas,
  // as well as a saved one
  _initiateFetchingOfCanvas: function () {
    DrawingsStore.addChangeListener(this._loadCanvas);
    if (this.props.params.id) {
      ApiUtil.loadSavedDrawing(this.props.params.id);
    } else {
      DrawingsStore.addNewDrawingSaveListener(this._onSaveOfNewDrawing);
      ApiUtil.makeNewDrawing(this.props.params.id);
    }
  },

  componentDidMount: function () {
    this._initiateFetchingOfCanvas();
  },

  componentWillReceiveProps: function (newProps) {
    console.log(newProps);
    ApiUtil.loadSavedDrawing(newProps.params.id);
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
