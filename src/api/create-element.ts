type Type =
  | keyof HTMLElementTagNameMap
  | ((props: Props | null, ...children: unknown[]) => CreateElementResult)
  | 'fragment';

type Props = {
  key?: string | null;
  ref?: unknown | null;
  [key: string]: unknown;
};

type CreateElementResult = {
  type?: Type;
  props: Props | null;
  key?: string | null;
  ref?: unknown | null;
};

export const createElement = (
  type: Type,
  props: Props | null,
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
