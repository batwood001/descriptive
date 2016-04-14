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