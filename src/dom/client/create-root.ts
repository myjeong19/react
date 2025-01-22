import type { VirtualDOM } from '@src/api/create-element';
import { render as callRender } from '@src/util';

export const createRoot = (rootElement: HTMLElement) => {
  return {
    render(Component: VirtualDOM) {
      callRender(rootElement, Component);
    },
  };
};
