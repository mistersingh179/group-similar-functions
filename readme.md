# groupSimilarFunctions

Takes an array of functions and sorts them by putting functions with similar names together. 

For e.g.

If you have functions names like 
```
['balance', 'cats', 'setBalance', 'removeCat']
``` 
then it will re-arrange them and return 
```
['cats', 'removeCat', 'balance', 'setBalance']
```

## Usage

```
const groupSimilarFunctions = require('groupSimilarFunctions');
const input = ['balance', 'cats', 'setBalance', 'removeCat']
const output = groupSimilarFunctions(input);
console.log(output);
```

## Contribution

Please submit a PR.