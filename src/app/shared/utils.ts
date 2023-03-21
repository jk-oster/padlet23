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

  /**
   * Debounce function: limit the number of times a function can be called in a given time.
   * @param func
   * @param delay
   */
  static debounce(func: Function, delay: number) {
    let timer: any;
    return (...args: any[]) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  /**
   * Throttle function: limit the number of times a function can be called in a given time.
   * @param func
   * @param delay
   */
  static throttle(func: Function, delay: number) {
    let timer: any;
    return (...args: any[]) => {
      if (!timer) {
        timer = setTimeout(() => {
          func.apply(this, args);
          timer = null;
        }, delay);
      }
    };
  }
}

