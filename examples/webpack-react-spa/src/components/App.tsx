import React from 'react';
import { RouterProvider, RouterSlot } from 'tiny-router/react';

const App = () => (
  <RouterProvider>
    <div>
      Hello world
      <main>
        <RouterSlot name="main" />
      </main>
      <aside>
        <RouterSlot name="aside" />
      </aside>
      <footer>
        <RouterSlot name="footer" />
      </footer>
    </div>
  </RouterProvider>
);

export default App;
