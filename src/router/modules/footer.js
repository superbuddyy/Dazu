/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const footerRoutes = {
  path: '/footer',
  component: Layout,
  redirect: '/footer',
  name: 'Footer',
  alwaysShow: true,
  meta: {
    title: 'Footer',
    icon: 'el-icon-tickets',
    permissions: ['view menu administrator'],
  },
  children: [
    {
      path: 'footers-list',
      component: () => import('@/views/footer/List'),
      name: 'FooterList',
      meta: { title: 'Lista footer', noCache: true, icon: 'user', permissions: ['manage footer'] },
    },
    {
      path: 'add-footer',
      component: () => import('@/views/footer/AddFooter'),
      name: 'AddFooter',
      meta: { title: 'Dodaj footer', noCache: true, icon: 'user', permissions: ['manage footer'] },
    },
    {
      path: 'edit-footer',
      component: () => import('@/views/footer/EditFooter'),
      name: 'EditFooter',
      hidden: true,
      meta: { title: 'Edytuj footer', noCache: true, icon: 'user', permissions: ['manage footer'] },
    },
  ],
};

export default footerRoutes;
