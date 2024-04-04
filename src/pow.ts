const pow = function (base, exponent) {
  function checkNumber(arg) {
    if (typeof arg !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
  }

  if (arguments.length === 1) {
    checkNumber(base);
    return function (exp) {
      checkNumber(exp);
      return Math.pow(base, exp);
    };
  } else {
    checkNumber(base);
    checkNumber(exponent);
    return Math.pow(base, exponent);
  }
};

export default pow;
