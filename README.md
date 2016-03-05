# descriptive
A library for descriptive statistics.

`npm install descriptive`

## 0.0.1
```javascript
import hist from 'descriptive';
// or
var hist = require('descriptive').default;

hist([4,4,4,4,4,4,1,1,1,6,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,9,9,9], {binCount: 5})
```
Will log to the console:

![sample](https://github.com/batwood001/descriptive/blob/develop/demo.png)
