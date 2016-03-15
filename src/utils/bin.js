import _ from 'lodash';

export default (array, opts) => {
  let {
    binCount = 10 // fix babel to default
  } = opts;
  binCount = binCount ? binCount : 10

  if (binCount === 0) {
    throw new Error('Must have at least one bin')
  }
  const sorted = array;
  const length = sorted.length;
  const min = sorted[0];
  const max = sorted[length - 1];
  if (_.uniq(sorted).length < binCount) {
    throw new Error('Array should contain at least binCount different elements ');
  }
  const binSize = (max - min) / binCount; // bin size change based on input data
  const bins = createBins(binCount, binSize, min)
  const populated = populateBins(sorted, bins, max)
  return populated;
}

function populateBins(array, bins, max) {
  return _.map(bins, bin => {
    const {
      low,
      high
    } = bin;

    bin.count = _.reduce(array, (count, el) => {
      if ((low <= el && el < high) || (high === max && el === max)) {
        return count + 1;
      }
      return count;
    }, 0);

    return bin;
  });
}

function createBins(binCount, binSize, min) {
  return _.chain()
    .range(binCount)
    .map(num => {
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
    })
    .value();
}
