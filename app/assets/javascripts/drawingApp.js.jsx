var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var DrawingApp = React.createClass({
  render: function () {
    return <div>Test!</div>;
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
