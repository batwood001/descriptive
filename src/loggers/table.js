import _ from 'lodash';
import bin from '../utils/bin';
import {repeat} from './utils';
import statisticUtilDefault from '../utils/statisticUtil';
const statisticUtil = statisticUtilDefault();


export function generateTable(array, spacing) {
  const measures = ['min', 'max', 'mean', 'median', 'std'];
  const maxWidth = 7;
  const table = _.chain(measures)
    .map(measure => {
      const len = measure.length;
      return `|${spacing}${measure}:${repeat(' ', maxWidth - len)} ${statisticUtil[measure](array).toFixed(2)}${spacing}|`;
    })
    .unshift(repeat(' _ ', maxWidth))
    .push(repeat(' - ', maxWidth))
    .value()
    .join('\n');
  console.log(table);
}