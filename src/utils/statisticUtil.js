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

export default function main() {
  return {min, max, mean, median, std};
}