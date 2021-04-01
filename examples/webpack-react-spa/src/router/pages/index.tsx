import React from 'react';

const MainComponent = () => <div>Index main test component</div>;
const AsideComponent = () => <div>Index aside test component</div>;
const FooterComponent = () => <div>Index footer test component</div>;

export default {
  middlewares: [],
  components: [
    {
      name: 'main',
      component: MainComponent,
    },
    {
      name: 'aside',
      component: AsideComponent,
    },
    {
      name: 'footer',
      component: FooterComponent,
    },
  ],
};
