export default {
  routes: [
    { path: '/old', redirect: '/items?sort=date', keepQuery: true },
    { path: '/items', component: './items' },
  ],
};
