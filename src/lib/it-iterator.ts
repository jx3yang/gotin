import { Iterator } from './iterator';

export class ItIterator<T> implements Iterator<T> {
  iterators: Iterator<T>[]
  index: number

  constructor(iterators: Iterator<T>[]) {
    this.iterators = iterators;
    this.index = 0;
  }

  next() {
    const item = this.iterators[this.index].next();
    if (!this.iterators[this.index].hasNext()) {
      this.index++;
    }
    return item;
  }

  hasNext() {
    return this.index < this.iterators.length;
  }

  reset() {
    this.index = 0;
    this.iterators.forEach(it => it.reset());
  }
}
