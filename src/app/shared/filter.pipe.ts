import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform<T>(value: T[], predicates: ((item: T) => boolean)[], mode: string = 'AND'): T[] {
    if (!value) {
      return [];
    }

    if (!predicates || predicates.length === 0) {
      return value;
    }

    if (mode === 'AND') {
      const andPredicate = (item: T) => predicates.every(p => p(item));
      return value.filter(andPredicate);
    }

    if (mode === 'OR') {
      const orPredicate = (item: T) => predicates.some(p => p(item));
      return value.filter(orPredicate);
    }

    if (mode === 'NOT') {
      const notPredicate = (item: T) => predicates.every(p => !p(item));
      return value.filter(notPredicate);
    }

    return value;
  }
}
