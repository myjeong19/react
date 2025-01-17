type Element = keyof HTMLElementTagNameMap;
type Component = (props: InputProps | null, ...children: unknown[]) => CreateElementResult;
type Type = Element | Component | 'fragment';

type InputProps = {
  key?: string | null;
  ref?: unknown | null;
  [key: string]: unknown;
};

type OutputProps = {
  [key: string]: unknown;
  children?: unknown | unknown[];
};

type CreateElementResult = {
  type?: Type;
  props: OutputProps;
  key?: string | null;
  ref?: unknown | null;
};

export const createElement = (
  type: Type,
  props: InputProps | null,
  ...children: unknown[]
): CreateElementResult => {
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
