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
    if (!obj) {
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

  static URL_PATTERN = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;

  static wrapUrl(text: string, target: string = '_blank', linkClass: string = 'link') {
    const url_pattern = Utils.URL_PATTERN;

    return text.replace(url_pattern, (url) => {
      const protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
      const href = protocol_pattern.test(url) ? url : 'http://' + url;
      return `<a href="${href}" class="${linkClass}" target="${target}">${url}</a>`;
    });
  }

  static containsUrl(text: string) : boolean {
    const newText = text.toString();
    return  Utils.URL_PATTERN.test(newText);
  }

  static getUrl(text: string) : string {
    const newText = text.toString();
    return newText.match(Utils.URL_PATTERN)?.[0] ?? '';
  }

}
