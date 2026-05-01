import _ from "lodash";

export const setValue = (object, path, value) => {
  if (value === null || value === "0") {
    return object;
  }
  return _.set(object, path, value);
};

export const getValue = (object, path, defaultValue) => {
  const value = _.get(object, path, defaultValue);
  return value === null || value === "0" ? defaultValue : value;
};

export const isEmpty = (object) => {
  return _.isEmpty(object) || object === "0" || object === null;
};
