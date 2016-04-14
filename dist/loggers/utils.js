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