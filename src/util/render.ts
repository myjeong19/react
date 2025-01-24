import type { VirtualDOM, VirtualDOMProps, Element, Component } from '@src/api';

const normalizeChildren = (children: unknown) =>
  Array.isArray(children) ? children : children ? [children] : [];

const createChildNode = (child: unknown, parent: Node, rootElement: HTMLElement): void => {
  if (child == null) return;

  const node =
    typeof child === 'string' || typeof child === 'number'
      ? document.createTextNode(String(child))
      : render(rootElement, child as VirtualDOM);

  parent.appendChild(node);
};

const renderChildren = (rootElement: HTMLElement, parent: Node, children: unknown): void =>
  normalizeChildren(children).forEach(child => createChildNode(child, parent, rootElement));

const setElementAttribute = (element: HTMLElement, key: string, value: unknown) => {
  if (key === 'className') {
    element.setAttribute('class', String(value));
    return;
  }
  if (key.startsWith('on') && typeof value === 'function') {
    element.addEventListener(key.toLowerCase().substring(2), value as EventListener);
    return;
  }
  element.setAttribute(key, String(value));
};

const renderHandlers = {
  text: (props: unknown) => document.createTextNode(String(props)),

  fragment: (rootElement: HTMLElement, props: VirtualDOMProps) => {
    const fragment = document.createDocumentFragment();
    renderChildren(rootElement, fragment, props.children);
    return fragment;
  },

  function: (rootElement: HTMLElement, props: VirtualDOMProps, type: Component) => {
    const result = type(props, props.children);
    return render(rootElement, result);
  },

  element: (rootElement: HTMLElement, props: VirtualDOMProps = {}, type: Element) => {
    const element = document.createElement(type);

    Object.entries(props || {}).forEach(([key, value]) => {
      if (key === 'children') return;
      setElementAttribute(element, key, value);
    });

    renderChildren(rootElement, element, props.children);
    return element;
  },
};

const setNode = (rootElement: HTMLElement, virtualDOM: VirtualDOM) => {
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

  return node;
};

export const render = (rootElement: HTMLElement, virtualDOM: VirtualDOM): Node => {
  const node = setNode(rootElement, virtualDOM);

  rootElement.appendChild(node);
  return node;
};
