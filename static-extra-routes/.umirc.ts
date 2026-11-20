export default {
  ssr: {},
  exportStatic: {
    extraRoutePaths: [{ path: '/news/1', prerender: false }],
  },
};
