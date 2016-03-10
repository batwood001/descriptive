import _ from 'lodash';
import bin from '../utils/bin';
const statisticUtil = require('../utils/statisticUtil').default();

export default (array, opts) => {
  array = array.sort((a, b) => a - b);
  const bins = bin(array, opts);
  const maxCount = _.reduce(bins, (max, bin) => {
    return bin.count > max ? bin.count : max
  }, 0);
  const minCount = _.reduce(bins, (min, bin) => {
    return bin.count < min ? bin.count : min
  }, Infinity);

  const spacing = repeat(' ', 3);
  for (let i = maxCount; i >= minCount - 1; i--) {
    console.log(generateRow(bins, i, maxCount, minCount, spacing));
  }
  console.log(generateTable(array, spacing));
}

function generateTable(array, spacing) {
  const measures = ['min', 'max', 'mean', 'median', "std"];
  const maxWidth = 7;
  return _.chain(measures)
    .map(measure => {
      const len = measure.length;
      return `|${spacing}${measure}:${repeat(' ', maxWidth - len)} ${statisticUtil[measure](array).toFixed(2)}${spacing}|`;
    })
    .unshift(repeat(' _ ', maxWidth))
    .push(repeat(' - ', maxWidth))
    .value()
    .join('\n');
}

function generateRow(bins, currentCount, maxCount, minCount, spacing) {
  const yLabelColumnWidth = countDigits(maxCount);
  const yLabel = `${currentCount}${repeat(' ', yLabelColumnWidth - countDigits(currentCount))}`;
  const columnWidth = countDigits(_.last(bins).high.toFixed(2));

  if (currentCount === minCount - 1) {
    return generateXLabels(bins, spacing, yLabelColumnWidth, columnWidth)
  } else {
    return _.reduce(bins, (str, bin) => {
      if (bin.count >= currentCount) {
        return `${str}${spacing}${repeat('#', columnWidth)}`;
      }
      return `${str}${spacing}${repeat(' ', columnWidth)}`;
    }, yLabel)
  }
}

function generateXLabels(bins, spacing, yLabelColumnWidth, columnWidth) {
  const spacingFromLeft = `${repeat(' ', yLabelColumnWidth)}${spacing}`;
  return _.reduce(bins, (str, bin) => {
    const thisLabelWidth = countDigits(bin.high.toFixed(2));
    return `${str}${bin.high.toFixed(2)}${spacing}${repeat(' ', columnWidth - thisLabelWidth)}`;
  }, spacingFromLeft);
}

function repeat(char, count) {
  return _.chain()
    .range(count)
    .map(() => char)
    .value()
    .join('');
}

function countDigits(num) {
  return String(num).length;
}
