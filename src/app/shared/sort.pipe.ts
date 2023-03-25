import { Pipe, PipeTransform } from '@angular/core';
import {Utils} from "./utils";

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any[], property: string, order: string = 'ASC'): any[] {
    if (!array) {
      return [];
    }

    const direction = order === 'ASC' ? 1 : -1;

    array.sort((a: any, b: any) => {
      const aProp = Utils.getProp(a, property);
      const bProp = Utils.getProp(b, property);

      if (aProp < bProp) {
        return -1 * direction;
      } else if (aProp > bProp) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    return array;
  }

}
