(function(root) {
  'use strict';
  var _previousCell = null;

  root.setPreviousCell = function (coord) {
    _previousCell = coord;
    paintCells([coord]);
  };

  root.handleNewCoord = function (coord) {
    if (_previousCell) {
      var cellsInBetween = [_previousCell.slice()], xDiff, yDiff, xDiffPositive, yDiffPositive;
      xDiff = coord[0] - _previousCell[0];
      yDiff = coord[1] - _previousCell[1];

      var resetxDiff = xDiff;
      var resetyDiff = yDiff;

      xDiffPositive = xDiff > 0 ? true : false;
      yDiffPositive = yDiff > 0 ? true : false;

      while (cellsInBetween[0][0] !== coord[0] || cellsInBetween[0][1] !== coord[1]) {
        while ((xDiff !== 0 || yDiff !== 0)) {
          var cellInBetween = cellsInBetween[0].slice();

          if (xDiff !== 0) {
            if (xDiffPositive) {
              cellInBetween[0] = cellInBetween[0] + 1;
              xDiff--;
            } else {
              cellInBetween[0] = cellInBetween[0] - 1;
              xDiff++;
            }
          }

          if (yDiff !== 0) {
            if (yDiffPositive) {
              cellInBetween[1] = cellInBetween[1] + 1;
              yDiff--;
            } else {
              cellInBetween[1] = cellInBetween[1] - 1;
              yDiff++;
            }
          }
          cellsInBetween.unshift(cellInBetween);
        }

        xDiff = resetxDiff;
        yDiff = resetyDiff;
      }

      paintCells(cellsInBetween);
      _previousCell = cellsInBetween[0];
    } else {
      _previousCell = coord;
    }
  };

  root.paintCells = function (cellsInBetween) {
    _previousCell = null;
    // var _cells = DrawingStore.get().content;
    var _cellsIdx = [];
    
    cellsInBetween.forEach(function (coord) {
      var idx = coord[1] * 50 + coord[0];
      _cellsIdx.push(idx);
      $("#" + idx.toString()).css("backgroundColor", ColorStore.get());
    });

    root.receiveUpdatedContent(_cellsIdx);
  };
}(this));
