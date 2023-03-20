/**
 * Get a property from an object, even if it's nested.
 * @param obj
 * @param prop
 */
export class Utils {

  /**
   * Get a property from an object, even if it's nested.
   * @param obj
   * @param propName
   */
  static getProp(obj: any, propName: any): any {
    if(!obj) {
        return null;
    }

    return obj[propName] ?? Object.keys(obj).reduce((foundValue, key) => {
      if (foundValue !== null) {
        return foundValue;
      }
      const value = obj[key];
      if (key === propName) {
        return value;
      }
      if (typeof value === 'object' && value !== null && propName in value) {
        return value[propName];
      }
      return null;
    }, null);
  }
}

