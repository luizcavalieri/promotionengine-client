export interface LazyTarget {
  element: Element;
  updateVisibility: (isVisible: boolean, ratio: number) => void;
}
