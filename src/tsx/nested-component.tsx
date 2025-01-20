import { createElement } from '@src/api';

export const NestedComponent = () => {
  return (
    <main>
      <h1 className="h1">H1</h1>
      <button onClick={() => console.log('click')}>Button</button>
      <section key="section">
        <strong>Section</strong>
        <article>
          Article
          <p></p>
        </article>
      </section>
    </main>
  );
};
