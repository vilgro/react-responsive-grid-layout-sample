import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Layout } from 'react-grid-layout';

import ResponsiveGrid from "./Grid/ResponsiveGrid/ResponsiveGrid";

import { Item } from "./Item"

import registerServiceWorker from './registerServiceWorker';

const layouts: Layout[] = [
  { i: "1", w: 3, h: 5, x: 0, y: 0, minW: 1, minH: 1 },
  { i: "2", w: 3, h: 5, x: 3, y: 0, minW: 1, minH: 1 },
  { i: "3", w: 3, h: 5, x: 6, y: 0, minW: 1, minH: 1 },
];

ReactDOM.render(
  <ResponsiveGrid
    layouts={{
      lg: layouts,
      md: layouts,
      sm: layouts,
      xs: layouts,
      xxs: layouts,
    }}
    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
  >
    <Item />
    <Item />
    <Item />
  </ResponsiveGrid>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
