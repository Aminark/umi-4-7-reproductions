export default {
  ssr: {},
  exportStatic: {},
  routes: [
    {
      path: '/docs',
      component: './section',
      routes: [{ path: 'install', component: './install' }],
    },
  ],
};
