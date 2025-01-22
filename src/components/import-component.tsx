import { ExportComponent } from './export-component';
import { createElement, Fragment } from '@src/api';

export const ImportComponent = () => {
  return (
    <>
      <h1>Import Component</h1>
      <ExportComponent />
    </>
  );
};
