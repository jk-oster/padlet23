import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from './utils';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform<T>(items: T[], searchText: string, properties: string[]): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((item: T) => {
      // @ts-ignore
      return properties.reduce((hasText, property) => {
        return hasText || Utils.getProp(item, property).toLowerCase().includes(searchText);
      }, false);
    });
  }
}
