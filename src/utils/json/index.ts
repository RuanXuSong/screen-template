export default {
  /**
   * 反转object的key和value
   * @param obj
   */
  reverseObj(obj: { [x: string]: string | number }) {
    const reversedObj: { [x: string]: string | number } = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      reversedObj[value] = key;
    });
    return reversedObj;
  },

  /**
   * 删除对象中无效属性
   * @param params
   */
  removeEmpty(obj: object) {
    const newObj = {};
    Object.keys(obj).forEach(key => {
      if (!['', null, undefined].includes(obj[key])) {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  },
};
