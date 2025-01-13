import { createElement } from './api';
import { Component, NestedComponent, FragmentComponent } from './tsx';

const customComponent = createElement('h1', { className: 'h1' }, 'Hello');
const customNestedComponent = createElement(
  'main',
  { className: 'main' },
  createElement(
    'h1',
    { className: 'h1' },
    'Nested Hello',
    createElement('h1', { className: 'h1' }, 'Nested Hello')
  )
);
const customFragmentComponent = createElement(
  'fragment',
  null,
  createElement('h1', { className: 'h1' }, 'h1'),
  createElement('div', { className: 'div' }, 'div')
);

const tsxComponent = createElement(Component, {
  className: 'Component',
});

const tsxNestedComponent = createElement(NestedComponent, {
  className: 'NestedComponent',
});

const tsxFragmentComponent = createElement(FragmentComponent, null);

const transformJSON = (json: unknown) => {
  return JSON.stringify(json, null, 2);
};

console.log('customComponent', transformJSON(customComponent));
console.log('customNestedComponent', transformJSON(customNestedComponent));
console.log('customFragmentComponent', transformJSON(customFragmentComponent));
console.log('tsxComponent', transformJSON(tsxComponent));
console.log('tsxNestedComponent', transformJSON(tsxNestedComponent));
console.log('tsxFragmentComponent', transformJSON(tsxFragmentComponent));
