import { createElement } from './api';
import { Component, NestedComponent, FragmentComponent, ImportComponent } from './tsx';
import { render } from './util';

const customComponent = createElement('h1', { className: 'h1' }, 'Hello');
const customNestedComponent = createElement(
  'main',
  { className: 'main' },
  createElement('h1', { className: 'h1' }, 'Custom Nested Component H1')
);
const customFragmentComponent = createElement(
  'fragment',
  null,
  createElement('h1', { className: 'h1' }, 'Custom Fragment Component H1'),
  createElement('div', { className: 'div' }, 'Custom Fragment Component Div')
);

const tsxComponent = Component();

const tsxNestedComponent = NestedComponent();

const tsxFragmentComponent = FragmentComponent();

const root = document.getElementById('root')!;

render(root, customComponent);
render(root, customNestedComponent);
render(root, customFragmentComponent);
render(root, tsxComponent);
render(root, tsxFragmentComponent);
render(root, tsxNestedComponent);
render(root, ImportComponent());
