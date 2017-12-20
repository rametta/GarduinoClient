import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Home from '@/components/Home';
import Garden from '@/components/Garden';
import PageNotFound from '@/components/PageNotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/garden/:garden',
      name: 'garden',
      component: Garden,
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
