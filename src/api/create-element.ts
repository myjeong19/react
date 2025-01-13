type Type =
  | keyof HTMLElementTagNameMap
  | ((props: Props | null, ...children: unknown[]) => CreateElementResult)
  | 'fragment';

type Props = {
  key?: string | null;
  ref?: unknown | null;
  className?: string;
  id?: string;
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

  if (!type) {
    return {
      key: key ? key : null,
      ref: ref ? ref : null,
      props: {
        ...restProps,
        children: children.length <= 1 ? children[0] : children,
      },
    };
  }

  if (typeof type === 'function') {
    const componentProps = {
      ...restProps,
      children: children.length <= 1 ? children[0] : children,
    };

    return type(componentProps);
  }

  return {
    type: type && 'fragment' !== type ? type : undefined,
    key: key ? key : null,
    ref: ref ? ref : null,
    props: {
      ...restProps,
      children: children.length <= 1 ? children[0] : children,
    },
  };
};
