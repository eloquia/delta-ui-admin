import { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type VueElement = VNode
    // tslint:disable no-empty-interface
    // interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: unknown;
    }
  }
}
