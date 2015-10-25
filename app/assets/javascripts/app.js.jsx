var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Sidebar/>
        <div className="main-component">
          {this.props.children}
        </div>
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Browse}/>
    <Route path="users/:id" component={UserDetails}/>
    <Route path="browse/:id" component={Browse}/>
    <Route path="drawings/new" component={DrawingApp}/>
    <Route path="drawings/:id" component={DrawingApp}/>
    <Route path="drawing_details/:id" component={DrawingDetails}/>
    <Route path="search/" component={Search}/>
  </Route>
);

function RenderApp () {
  React.render(<Router>{routes}</Router>, document.getElementById('content'));
}
