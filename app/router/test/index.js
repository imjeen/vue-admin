export default [
    {
        path: 'a',
        component: () => import(/* webpackChunkName: "common-router" */ '@app/views/index.vue'),
    },
];
