import _ from 'lodash';

export function repeat(char, count) {
  return _.chain()
    .range(count)
    .map(() => char)
    .value()
    .join('');
}