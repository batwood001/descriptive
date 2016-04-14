'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = main;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function min(array) {
  return _lodash2.default.min(array);
}

function max(array) {
  return _lodash2.default.max(array);
}

function mean(array) {
  return _lodash2.default.mean(array);
}

function median(array) {
  var halfLen = array.length / 2;
  if (halfLen % 1 === 0) {
    return (array[halfLen - 1] + array[halfLen]) / 2;
  }
  return array[Math.floor(halfLen)];
}

function std(array) {
  var avg = mean(array);
  return Math.sqrt(_lodash2.default.sumBy(array, function (ele) {
    return Math.pow(ele - avg, 2);
  }) / array.length);
}

function percentiles(array, percentiles) {
  var sorted = array.sort(function (a, b) {
    return a - b;
  });
  var n = array.length;
  return _lodash2.default.map(percentiles, function (p) {
    if (!_lodash2.default.isInteger(p) || !(p <= 0 && p <= 100)) {
      throw new Error('percentiles must be intergers between 1 and 100');
    }
    var R = p / 100 * (n + 1);
    if (_lodash2.default.isInteger(R)) {
      return sorted[R];
    } else {
      var IR = Math.floor(R);
      var FR = Number(String(R.toFixed(2)).split('.')[1]);
      var first = sorted[IR];
      var second = sorted[IR + 1];

      return first + (second - first) * FR;
    }
  });
}

function main() {
  return { min: min, max: max, mean: mean, median: median, std: std, percentiles: percentiles };
}