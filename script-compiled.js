"use strict";
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTable = generateTable;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bin = require('../utils/bin');

var _bin2 = _interopRequireDefault(_bin);

var _utils = require('./utils');

var _statisticUtil = require('../utils/statisticUtil');

var _statisticUtil2 = _interopRequireDefault(_statisticUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var statisticUtil = (0, _statisticUtil2.default)();

function generateTable(array, spacing) {
  var measures = ['min', 'max', 'mean', 'median', 'std'];
  var maxWidth = 7;
  var table = _lodash2.default.chain(measures).map(function (measure) {
    var len = measure.length;
    return '|' + spacing + measure + ':' + (0, _utils.repeat)(' ', maxWidth - len) + ' ' + statisticUtil[measure](array).toFixed(2) + spacing + '|';
  }).unshift((0, _utils.repeat)(' _ ', maxWidth)).push((0, _utils.repeat)(' - ', maxWidth)).value().join('\n');
  console.log(table);
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeat = repeat;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function repeat(char, count) {
  return _lodash2.default.chain().range(count).map(function () {
    return char;
  }).value().join('');
}
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
