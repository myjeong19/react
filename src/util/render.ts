import type { VirtualDOM, VirtualDOMProps } from '@src/api';

const isTextContent = (children: unknown): children is string | number => {
  return typeof children === 'string' || typeof children === 'number';
};

const normalizeChildren = (children: unknown) => {
  if (Array.isArray(children)) {
    return children;
  }
  return children ? [children] : [];
};

const createTextNode = (content: string | number) => document.createTextNode(String(content));

const createChildNode = (child: unknown, parent: Node, rootElement: HTMLElement) => {
  if (child == null) return;

  const node = isTextContent(child)
    ? createTextNode(child)
    : render(rootElement, child as VirtualDOM);

  parent.appendChild(node);
};

const renderChildren = (rootElement: HTMLElement, parent: Node, children: unknown) =>
  normalizeChildren(children).forEach(child => createChildNode(child, parent, rootElement));

const renderHandlers = {
  text: (props: unknown) => document.createTextNode(String(props)),

  fragment: (rootElement: HTMLElement, props: VirtualDOMProps) => {
    const fragment = document.createDocumentFragment();
    renderChildren(rootElement, fragment, props.children);
    return fragment;
  },

  function: (rootElement: HTMLElement, props: VirtualDOMProps, type: Function) => {
    const result = type(props, props.children);
    return render(rootElement, result);
  },

  element: (
    rootElement: HTMLElement,
    props: VirtualDOMProps,
    type: keyof HTMLElementTagNameMap
  ) => {
    const element = document.createElement(type);

    Object.entries(props || {}).forEach(([key, value]) => {
      if (key === 'children') return;
      if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.toLowerCase().substring(2), value as EventListener);
        return;
      }
      element.setAttribute(key, String(value));
    });

    renderChildren(rootElement, element, props.children);
    return element;
  },
};

export const render = (rootElement: HTMLElement, virtualDOM: VirtualDOM): Node => {
  const { type, props } = virtualDOM;
  let node: Node;

  if (!type) {
    node = renderHandlers.text(props);
  } else if (type === 'fragment') {
    node = renderHandlers.fragment(rootElement, props);
  } else if (typeof type === 'function') {
    node = renderHandlers.function(rootElement, props, type);
  } else {
    node = renderHandlers.element(rootElement, props, type);
  }

  rootElement.appendChild(node);
  return node;
};
