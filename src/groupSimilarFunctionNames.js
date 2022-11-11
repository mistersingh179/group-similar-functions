import _ from "lodash";
import pluralize from "pluralize";

const { plural, singular, isSingular } = pluralize;

export default function groupSimilarFunctionNames(items, nameOfKey) {
  let convertedInputToObj = false;
  if (items.every((x) => _.isString(x))) {
    convertedInputToObj = true;
    items = items.map((item) => ({
      name: item,
    }));
    nameOfKey = "name";
  }

  items.sort((a, b) => a[nameOfKey].length - b[nameOfKey].length);
  const output = [];
  const indexesTaken = {};
  items.forEach((item, idx) => {
    const name = item[nameOfKey];
    if (!indexesTaken[idx]) {
      output.push(item);
      indexesTaken[idx] = true;
    }
    const nameAsSuffix = name.charAt(0).toLocaleUpperCase() + name.slice(1);
    let nameAsSuffix2 = nameAsSuffix;
    if (isSingular(nameAsSuffix)) {
      nameAsSuffix2 = plural(nameAsSuffix);
    } else {
      nameAsSuffix2 = singular(nameAsSuffix);
    }
    items.forEach((comparingItem, comparingItemIdx) => {
      const comparingName = comparingItem[nameOfKey];
      if (
        comparingName === name ||
        comparingName.endsWith(nameAsSuffix) ||
        comparingName.endsWith(nameAsSuffix2) ||
        comparingName.startsWith(nameAsSuffix) ||
        comparingName.startsWith(nameAsSuffix2)
      ) {
        if (!indexesTaken[comparingItemIdx]) {
          output.push(comparingItem);
          indexesTaken[comparingItemIdx] = true;
        }
      }
    });
  });
  if(convertedInputToObj == true){
    return output.map(item => item[nameOfKey]);
  }else{
    return output;
  }
}
