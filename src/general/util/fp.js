/**
 * compose
 * For example, `compose(f, g, h)` is identical to doing
 * `(...args) => f(g(h(...args)))`
 */

export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

/**
 * object filter
 * func(acc, val, key)
 */

export const objectFilter = (func, obj) =>
  Object.keys(obj).reduce((acc, key) => {
    if (func(obj[key], key)) {
      return Object.assign(acc, { [key]: obj[key] });
    }
    return acc;
  }, {});

/**
 * object map
 * func(val, key)
 */

export const objectMap = (func, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => Object.assign(acc, { [key]: func(obj[key], key) }),
    {},
  );

/**
 * object reduce
 * func(acc, val, key)
 */

export const objectReduce = (func, initialValue, obj) =>
  Object.keys(obj).reduce((acc, key) => func(acc, obj[key], key), initialValue);

