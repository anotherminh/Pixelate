(function (root) {
  'use strict';
  root.PagesButton = React.createClass({
    displayName: "PagesButton",

    handlePageClick: function (e) {
      console.log(e.currentTarget);
    },

    render: function () {
      var currentPage = parseInt(this.props.currentPage);

      if (currentPage > 3) {
        var pagesNum = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
      } else {
        var pagesNum = [currentPage, currentPage + 1, currentPage + 2];
      }

      return React.createElement(
        "div",
        { className: "page-buttons" },
        pagesNum.map((function (num) {
          return React.createElement(
            "div",
            { className: num == currentPage ? "page-button current-page" : "page-button",
              onClick: this.handlePageClick },
            num
          );
        }).bind(this))
      );
    }
  });
})(this);