import { createRouter, createWebHistory } from 'vue-router';
// 假设你有这些组件，需要根据实际情况调整
import SimulationExperiment from '@/views/simulation_experiment/index.vue';

const routes = [
  {
    path: '/',
    name: 'SimulationExperiment',
    component: SimulationExperiment
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;