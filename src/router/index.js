import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Home from '@/components/Home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Garden from '@/components/Garden';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/garden/:garden',
      name: 'Garden',
      component: Garden,
    },
  ],
});
