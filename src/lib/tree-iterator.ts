import { Iterator } from './iterator';

type IteratorItem<T> = {
  node: T
  path: number[]
}

function levelTraversal<T>(root: T, getChildren: (node: T) => T[], rootIndex: number): IteratorItem<T>[] {
  const items: IteratorItem<T>[] = [];
  let currentLevel: IteratorItem<T>[] = [{ node: root, path: [rootIndex] }];
  let nextLevel: IteratorItem<T>[] = [];

  while (currentLevel.length > 0) {
    currentLevel.forEach(item => {
      items.push(item);
      nextLevel.push(...getChildren(item.node).map((child, index) => ({
        node: child,
        path: [...item.path, index],
      })));
    });
    currentLevel = nextLevel;
    nextLevel = [];
  }

  return items;
}

export class TreeLevelIterator<T> implements Iterator<IteratorItem<T>> {
  levelTraversalNodes: IteratorItem<T>[]
  index: number

  constructor(root: T, getChildren: (node: T) => T[], rootIndex: number) {
    this.levelTraversalNodes = levelTraversal(root, getChildren, rootIndex);
    this.index = 0;
  }

  next() {
    return this.levelTraversalNodes[this.index++];
  }

  hasNext() {
    return this.index < this.levelTraversalNodes.length;
  }

  reset() {
    this.index = 0;
  }
}
