/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const subscriptionRoutes = {
  path: '/settings',
  component: Layout,
  redirect: '/settings',
  name: 'Settings',
  alwaysShow: true,
  meta: {
    title: 'Ustawienia',
    icon: 'el-icon-setting',
    permissions: ['view menu administrator'],
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/settings/List'),
      name: 'SettingsList',
      meta: { title: 'Lista ustawień', noCache: true, icon: 'user', permissions: [] },
    },
    {
      path: 'edit',
      component: () => import('@/views/settings/Edit'),
      name: 'EditSettings',
      hidden: true,
      meta: { title: 'Edytuj ustawienia', noCache: true, icon: 'user', permissions: [] },
    },
  ],
};

export default subscriptionRoutes;
