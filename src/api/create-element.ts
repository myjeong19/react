export type Element = keyof HTMLElementTagNameMap;
export type Component = (props: VirtualDOMInputProps | null, ...children: unknown[]) => VirtualDOM;
export type RenderType = Element | Component | 'fragment';

type VirtualDOMInputProps = {
  key?: string | null;
  ref?: unknown | null;
  [key: string]: unknown;
};

export type VirtualDOMProps = {
  [key: string]: unknown;
  children?: unknown | unknown[];
};

export type VirtualDOM = {
  type?: RenderType;
  props: VirtualDOMProps;
  key?: string | null;
  ref?: unknown | null;
};

export const createElement = (
  type: RenderType,
  props: VirtualDOMInputProps | null,
  ...children: unknown[]
): VirtualDOM => {
  const { key, ref, ...restProps } = props || {};

  if (typeof type === 'function') {
    return type({ ...restProps, children: children.length <= 1 ? children[0] : children });
  }

  return {
    type,
    key: key ? key : null,
    ref: ref ? ref : null,
    props: {
      ...restProps,
      children: children.length <= 1 ? children[0] : children,
    },
  };
};
