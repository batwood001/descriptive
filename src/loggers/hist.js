import _ from 'lodash';
import bin from '../utils/bin';

export default (array, opts) => {
  const bins = bin(array, opts);
  const maxCount = _.reduce(bins, (max, bin) => {
    return bin.count > max ? bin.count : max
  }, 0)

  const spacing = repeat(' ', 3);
  for (let i = maxCount; i > -1; i--) {
    console.log(generateRow(bins, i, maxCount, spacing))
  }
}

function generateRow(bins, currentCount, maxCount, spacing) {
  const yLabelColumnWidth = countDigits(maxCount);
  const yLabel = `${currentCount}${repeat(' ', yLabelColumnWidth - countDigits(currentCount))}`;
  const columnWidth = countDigits(_.last(bins).high.toFixed(2));

  if (currentCount === 0) {
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
