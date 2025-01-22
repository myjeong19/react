import { createElement, Fragment } from '@src/api';

import { Component } from './component';
import { FragmentComponent } from './fragment-component';
import { ImportComponent } from './import-component';
import { NestedComponent } from './nested-component';

export const App = () => {
  return (
    <>
      <Component />
      <FragmentComponent />
      <ImportComponent />
      <NestedComponent />
    </>
  );
};
