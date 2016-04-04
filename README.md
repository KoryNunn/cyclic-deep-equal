# cyclic-deep-equal

a strict deep-equal that can handle cyclic structures

## Usage

```javascript

var deepEqual = require('cyclic-deep-equal');

deepEqual(1, 1); // -> true;
deepEqual('a', 'a'); // -> true;
deepEqual(true, true); // -> true;
deepEqual(NaN, NaN); // -> true;
deepEqual(undefined, undefined); // -> true;
deepEqual({}, {}); // -> true;

deepEqual(1, '1'); // -> false;
deepEqual(null, undefined); // -> false;
deepEqual({a:1}, {b:1}); // -> false;



var x1 = {},
    x2 = {};

x1.x = x2;
x2.x = x1;

deepEqual(x1, x2); // -> true;

```