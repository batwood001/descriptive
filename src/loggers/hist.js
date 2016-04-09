import _ from 'lodash';
import bin from '../utils/bin';
import {repeat} from './utils';
import {generateTable} from './table';

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
  generateTable(array, spacing);
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

function countDigits(num) {
  return String(num).length;
}
