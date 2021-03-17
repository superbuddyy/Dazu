/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const blogRoutes = {
  path: '/blog',
  component: Layout,
  redirect: '/blog',
  name: 'Blog',
  alwaysShow: true,
  meta: {
    title: 'Blog',
    icon: 'el-icon-tickets',
    permissions: ['view menu administrator'],
  },
  children: [
    {
      path: 'posts-list',
      component: () => import('@/views/blog/List'),
      name: 'BlogList',
      meta: { title: 'Lista wpisów', noCache: true, icon: 'user', permissions: ['manage blog'] },
    },
    {
      path: 'add-post',
      component: () => import('@/views/blog/AddPost'),
      name: 'AddPost',
      meta: { title: 'Dodaj post', noCache: true, icon: 'user', permissions: ['manage blog'] },
    },
    {
      path: 'edit-post',
      component: () => import('@/views/blog/EditPost'),
      name: 'EditPost',
      hidden: true,
      meta: { title: 'Edytuj post', noCache: true, icon: 'user', permissions: ['manage blog'] },
    },
  ],
};

export default blogRoutes;
