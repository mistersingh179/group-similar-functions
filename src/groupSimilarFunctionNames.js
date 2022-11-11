import _ from "lodash";
import pluralize from "pluralize";

const { plural, singular, isSingular, isPlural } = pluralize;
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

    let siblingNames = [];
    siblingNames.push(name);
    if (isSingular(name)) {
      siblingNames.push(plural(name));
    }
    if (isPlural(name)) {
      siblingNames.push(singular(name));
    }
    if (name === "owner") {
      siblingNames.push("ownership");
    }
    siblingNames = siblingNames.map(
      (name) => name.charAt(0).toLocaleUpperCase() + name.slice(1)
    );

    items.forEach((comparingItem, comparingItemIdx) => {
      const comparingName = comparingItem[nameOfKey];
      if(siblingNames.some(siblingName => comparingName.endsWith(siblingName))){
        if (!indexesTaken[comparingItemIdx]) {
          output.push(comparingItem);
          indexesTaken[comparingItemIdx] = true;
        }
      }
    });
  });
  if (convertedInputToObj == true) {
    return output.map((item) => item[nameOfKey]);
  } else {
    return output;
  }
}
