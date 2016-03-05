import _ from 'lodash';

export default (array, opts) => {
  let {
    binCount = 10 // fix babel to default
  } = opts;
  binCount = binCount ? binCount : 10

  if (binCount === 0) {
    throw new Error('Must have at least one bin')
  }
  const sorted = array.sort((a, b) => a - b);
  const length = sorted.length;
  if (binCount > length) {
    throw new Error('# of bins must be <= input array size')
  }
  const min = sorted[0];
  const max = sorted[length - 1];
  const binSize = max / binCount; // xMin is 0
  const bins = createBins(binCount, binSize, min)
  const populated = populateBins(sorted, bins)
  return populated;
}

function populateBins(array, bins) {
  return _.map(bins, bin => {
    const {
      low,
      high
    } = bin;

    const count = _.reduce(array, (count, el) => {
      if (low < el && el <= high) {
        return count + 1;
      }
      return count;
    }, 0);

    return {
      low,
      high,
      count
    };
  });
}

function createBins(bins, binSize, min) {
  return _.chain()
    .range(bins)
    .map(num => {
      return {
        low: num * binSize,
        high: (num + 1) * binSize,
        count: 0,
      };
    })
    // Prepend one bucket to capture min values
    .unshift({
      low: min - 1,
      high: min,
      count: 0
    })
    .value();
}
