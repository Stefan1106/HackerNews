import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';  
import PostDetail from './components/PostDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage }, 
  { path: '/post/:id', name: 'PostDetail', component: PostDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
