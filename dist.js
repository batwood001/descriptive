'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bin = function(array, opts) {
  var _opts$binCount = opts.binCount;
  var binCount = _opts$binCount === undefined ? 10 : _opts$binCount;


  if (binCount === 0) {
    throw new Error('Must have at least one bin');
  }
  var sorted = array.sort(function (a, b) {
    return a - b;
  });
  var length = sorted.length;
  if (binCount > length) {
    throw new Error('# of bins must be <= input array size');
  }
  var min = sorted[0];
  var max = sorted[length - 1];
  var binSize = max / binCount; // xMin is 0
  var bins = createBins(binCount, binSize, min);
  var populated = populateBins(sorted, bins);
  return populated;
};

function populateBins(array, bins) {
  return _lodash2.default.map(bins, function (bin) {
    var low = bin.low;
    var high = bin.high;


    var count = _lodash2.default.reduce(array, function (count, el) {
      if (low < el && el <= high) {
        return count + 1;
      }
      return count;
    }, 0);

    return {
      low: low,
      high: high,
      count: count
    };
  });
}

function createBins(bins, binSize, min) {
  return _lodash2.default.chain().range(bins).map(function (num) {
    return {
      low: num * binSize,
      high: (num + 1) * binSize,
      count: 0
    };
  })
  // Prepend one bucket to capture min values
  .unshift({
    low: min - 1,
    high: min,
    count: 0
  }).value();
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// var _bin = require('./bin');
var _bin = bin;

var _bin2 = _interopRequireDefault(_bin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hist = function(array, opts) {
  var bins = (0, _bin2.default)(array, opts);
  var maxCount = _lodash2.default.reduce(bins, function (max, bin) {
    return bin.count > max ? bin.count : max;
  }, 0);

  var spacing = repeat(' ', 3);
  for (var i = maxCount; i > -1; i--) {
    console.log(generateRow(bins, i, maxCount, spacing));
  }
}

function generateRow(bins, currentCount, maxCount, spacing) {
  var yLabelColumnWidth = countDigits(maxCount);
  var yLabel = '' + currentCount + repeat(' ', yLabelColumnWidth - countDigits(currentCount));
  var columnWidth = countDigits(_lodash2.default.last(bins).high.toFixed(2));

  if (currentCount === 0) {
    return generateXLabels(bins, spacing, yLabelColumnWidth, columnWidth);
  } else {
    return _lodash2.default.reduce(bins, function (str, bin) {
      if (bin.count >= currentCount) {
        return '' + str + spacing + repeat('#', columnWidth);
      }
      return '' + str + spacing + repeat(' ', columnWidth);
    }, yLabel);
  }
}

function generateXLabels(bins, spacing, yLabelColumnWidth, columnWidth) {
  var spacingFromLeft = '' + repeat(' ', yLabelColumnWidth) + spacing;
  return _lodash2.default.reduce(bins, function (str, bin) {
    var thisLabelWidth = countDigits(bin.high.toFixed(2));
    return '' + str + bin.high.toFixed(2) + spacing + repeat(' ', columnWidth - thisLabelWidth);
  }, spacingFromLeft);
}

function repeat(char, count) {
  return _lodash2.default.chain().range(count).map(function () {
    return char;
  }).value().join('');
}

function countDigits(num) {
  return String(num).length;
}

exports.default = hist;
