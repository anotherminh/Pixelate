(function(root) {
  'use strict';
  root.PagesButton = React.createClass({
    render: function () {
      var currentPage = parseInt(this.props.currentPage);
      var maxPageNum = Math.ceil(DrawingsStore.getDrawingsCount() / 28);
      var pages = [currentPage];

      // try to add 2 of the previous pages, if they are > 0
      var previousPage;
      for (var i = 1; i < 3; i++) {
        previousPage = currentPage - i;
        if (previousPage > 0) {
          pages.unshift(previousPage);
        }
      }

      // try to add as many 'next' pages as possible
      // stop when reached the maxPageNum or when length = 5
      var j = 1;
      var nextPage = currentPage + j;
      while ((pages.length < 6) && (nextPage <= maxPageNum)) {
        pages.push(nextPage);

        j++;
        nextPage = currentPage + j;
      }

      return (
        <div className="page-buttons">
          {
            pages.map(function (num) {
              return (
                <div className={num == currentPage ? "page-button current-page" : "page-button"}
                     onClick={this.props.handlePageClick}
                     key={num}>
                  {num}
                </div>
              );
            }.bind(this))
          }
        </div>
      );
    }
  });
}(this));
