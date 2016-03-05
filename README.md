# descriptive
A library for descriptive statistics.

`npm install descriptive`

## 0.0.1

# usage
```javascript
import hist from 'descriptive';
// or
var hist = require('descriptive').default;

hist([4,4,4,4,4,4,1,1,1,6,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,9,9,9], {binCount: 5})
```
Will log to the console:

![sample](https://github.com/batwood001/descriptive/blob/develop/demo.png)

# contributing

You will need the `gulp` cli: `npm install --global gulp-cli`

The easiest way to dig in is to run the only gulp task so far, `gulp hist`, which takes two optional args:
`--array` and `--binCount`
So for instance:
`gulp hist --array=[1,1,1] --binCount=2`
