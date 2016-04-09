import _ from 'lodash';

function min(array) {
  return _.min(array);
}

function max(array) {
  return _.max(array);
}

function mean(array) {
  return _.mean(array);
}

function median(array) {
  const halfLen = array.length / 2;
  if (halfLen % 1 === 0) {
    return (array[halfLen - 1] + array[halfLen]) / 2;
  }
  return array[Math.floor(halfLen)];
}

function std(array) {
  const avg = mean(array);
  return Math.sqrt(_.sumBy(array, ele =>  Math.pow(ele - avg, 2)) / array.length);
}

function percentiles(array, percentiles) {
  const sorted = array.sort((a, b) => a - b);
  const n = array.length;
  return _.map(percentiles, p => {
    if (!_.isInteger(p) || !(p <= 0 && p <= 100)) {
      throw new Error('percentiles must be intergers between 1 and 100')
    }
    const R = p / 100 * (n + 1);
    if (_.isInteger(R)) {
      return sorted[R];
    } else {
      const IR = Math.floor(R);
      const FR = Number(String(R.toFixed(2)).split('.')[1]);
      const [first, second] = [sorted[IR], sorted[IR + 1]];
      return first + ((second - first) * FR);
    }
  });
}

export default function main() {
  return {min, max, mean, median, std, percentiles};
}