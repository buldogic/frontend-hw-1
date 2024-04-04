// @ts-nocheck

const patchArrays = () => {
  Array.prototype.count = function () {
    return this.length;
  };

  Array.prototype.insert = function (index: unknown, item: number) {
    if (typeof index !== 'number') throw new Error('INVALID_ARGUMENT');

    const arrLength: number = this.length;
    if (index <= 0) {
      this.unshift(item);
      return this;
    }

    if (index >= arrLength) {
      this.push(item);
      return this;
    }

    if (index > 0) {
      this.splice(1, 0, item);
      return this;
    }
  };
};
Array.prototype.remove = function (item: number) {
  const index = this.indexOf(item);
  if (index === -1) {
    return this;
  }
  this.splice(index, 1);
  return this;
};

export default patchArrays;
