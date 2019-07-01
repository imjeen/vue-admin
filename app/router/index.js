import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const requireFiles = require.context('./', true, /\.js$/);
const childRouters = requireFiles
    .keys()
    // 当前第一层目录下的第一个index.js 文件: ./目录名称/index.js
    .filter(path => /^(\.\/)[A-Za-z0-9]+\/index\.js$/i.test(path))
    .map(path => {
        const name = (path.replace('./', '').match(/^[A-Za-z0-9]+/i) || [])[0];
        return {
            path: `/${name}`,
            component: {
                name: name,
                template: '<router-view></router-view>',
            },
            children: requireFiles(path).default || [],
            meta: {
                requiresAuth: true,
            },
        };
    });

// console.log('childRouters', childRouters);

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "common-router" */ '@app/views/index.vue'),
        },

        ...childRouters,

        {
            path: '*',
            component: require('@app/views/404.vue').default,
        },
    ],
});

// router.beforeEach((to, from, next) => {});

export default router;
