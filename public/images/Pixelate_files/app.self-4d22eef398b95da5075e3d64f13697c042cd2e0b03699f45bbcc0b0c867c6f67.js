var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  displayName: "App",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(Sidebar, null),
      React.createElement(
        "div",
        { className: "main-component" },
        this.props.children
      )
    );
  }
});

var routes = React.createElement(
  Route,
  { path: "/", component: App },
  React.createElement(IndexRoute, { component: UserDetails }),
  React.createElement(Route, { path: "users/:id", component: UserDetails }),
  React.createElement(Route, { path: "users/", component: Browse }),
  React.createElement(Route, { path: "drawings/new", component: DrawingApp }),
  React.createElement(Route, { path: "drawings/:id", component: DrawingApp }),
  React.createElement(Route, { path: "drawing_details/:id", component: DrawingDetails }),
  React.createElement(Route, { path: "search/", component: Search })
);

function RenderApp() {
  React.render(React.createElement(
    Router,
    null,
    routes
  ), document.getElementById('content'));
}