/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const footersRoutes = {
  path: '/footers',
  component: Layout,
  redirect: '/footers',
  name: 'Footers',
  alwaysShow: true,
  meta: {
    title: 'Footer',
    icon: 'el-icon-tickets',
    permissions: ['view menu administrator'],
  },
  children: [
    {
      path: 'footers-list',
      component: () => import('@/views/footers/List'),
      name: 'FooterList',
      meta: { title: 'Lista footer', noCache: true, icon: 'user', permissions: ['manage footer'] },
    },
    {
      path: 'add-footer',
      component: () => import('@/views/footers/AddFooter'),
      name: 'AddFooter',
      meta: { title: 'Dodaj footer', noCache: true, icon: 'user', permissions: ['manage footer'] },
    },
    {
      path: 'edit-footer',
      component: () => import('@/views/footers/EditFooter'),
      name: 'EditFooter',
      hidden: true,
      meta: { title: 'Edytuj footer', noCache: true, icon: 'user', permissions: ['manage footer'] },
    },
  ],
};

export default footersRoutes;
