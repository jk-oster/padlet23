import {combineLatest, fromEvent, map, Observable} from "rxjs";

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
  static debounce(func: (...args: any[]) => any, delay: number = 1000): (...args: any[]) => any {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  /**
   * Create a computed observable.
   * Combine multiple observables into one, and call a function with the results.
   * @param inputs Observables to combine
   * @param fn Function to call with the results
   */
  static computed(inputs: Observable<any>[], fn: (...args: any[]) => any): Observable<any> {
    return combineLatest(inputs).pipe(
      map(args => fn(...args))
    );
  }

  /**
   * An observable that emits when a local storage item changes.
   */
  static localStorageChanges(): Observable<any> {
    return fromEvent(window, 'storage').pipe(
      map((event: any) => {
        return {
          key: event.key,
          newValue: event.newValue,
          oldValue: event.oldValue,
          storageArea: event.storageArea
        };
      })
    );
  }

  // get the current url and save it to the clipboard
  static copyToClipboard(text: string = window.location.href) {
    navigator.clipboard.writeText(text);
  }
}

