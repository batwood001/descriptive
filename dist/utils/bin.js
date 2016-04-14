'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (array, opts) {
  if (!_lodash2.default.isArray(array)) {
    throw new Error('the first argument to \'bin\' must be an array');
  }
  var _opts$binCount = // fix babel to default
  opts.binCount;
  var binCount = _opts$binCount === undefined ? 10 : _opts$binCount;

  binCount = binCount ? binCount : 10;

  if (binCount === 0) {
    throw new Error('Must have at least one bin');
  }
  var sorted = array;
  var length = sorted.length;
  if (!_lodash2.default.isInteger(binCount) || binCount < 1 || binCount > length) {
    throw new Error('# of bins must be an integer <= input array size');
  }
  var min = sorted[0];
  var max = sorted[length - 1];
  if (_lodash2.default.uniq(sorted).length < binCount) {
    throw new Error('Array should contain at least binCount different elements ');
  }
  var binSize = (max - min) / binCount; // bin size change based on input data
  var bins = createBins(binCount, binSize, min);
  var populated = populateBins(sorted, bins, max);
  return populated;
};

function populateBins(array, bins, max) {
  return _lodash2.default.map(bins, function (bin) {
    var low = bin.low;
    var high = bin.high;


    bin.count = _lodash2.default.reduce(array, function (count, el) {
      if (low <= el && el < high || high === max && el === max) {
        return count + 1;
      }
      return count;
    }, 0);

    return bin;
  });
}

function createBins(binCount, binSize, min) {
  return _lodash2.default.chain().range(binCount).map(function (num) {
    if (num === binCount - 1) {
      return {
        low: min + num * binSize,
        high: min + (num + 1) * binSize,
        count: 0
      };
    }
    return {
      low: min + num * binSize,
      high: min + (num + 1) * binSize,
      count: 0
    };
  }).value();
}