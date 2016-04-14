'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bin = require('../utils/bin');

var _bin2 = _interopRequireDefault(_bin);

var _utils = require('./utils');

var _table = require('./table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (array, opts) {
  array = array.sort(function (a, b) {
    return a - b;
  });
  var bins = (0, _bin2.default)(array, opts);
  var maxCount = _lodash2.default.reduce(bins, function (max, bin) {
    return bin.count > max ? bin.count : max;
  }, 0);
  var minCount = _lodash2.default.reduce(bins, function (min, bin) {
    return bin.count < min ? bin.count : min;
  }, Infinity);

  var spacing = (0, _utils.repeat)(' ', 3);
  for (var i = maxCount; i >= minCount - 1; i--) {
    console.log(generateRow(bins, i, maxCount, minCount, spacing));
  }
  (0, _table.generateTable)(array, spacing);
};

function generateRow(bins, currentCount, maxCount, minCount, spacing) {
  var yLabelColumnWidth = countDigits(maxCount);
  var yLabel = '' + currentCount + (0, _utils.repeat)(' ', yLabelColumnWidth - countDigits(currentCount));
  var columnWidth = countDigits(_lodash2.default.last(bins).high.toFixed(2));

  if (currentCount === minCount - 1) {
    return generateXLabels(bins, spacing, yLabelColumnWidth, columnWidth);
  } else {
    return _lodash2.default.reduce(bins, function (str, bin) {
      if (bin.count >= currentCount) {
        return '' + str + spacing + (0, _utils.repeat)('#', columnWidth);
      }
      return '' + str + spacing + (0, _utils.repeat)(' ', columnWidth);
    }, yLabel);
  }
}

function generateXLabels(bins, spacing, yLabelColumnWidth, columnWidth) {
  var spacingFromLeft = '' + (0, _utils.repeat)(' ', yLabelColumnWidth) + spacing;
  return _lodash2.default.reduce(bins, function (str, bin) {
    var thisLabelWidth = countDigits(bin.high.toFixed(2));
    return '' + str + bin.high.toFixed(2) + spacing + (0, _utils.repeat)(' ', columnWidth - thisLabelWidth);
  }, spacingFromLeft);
}

function countDigits(num) {
  return String(num).length;
}