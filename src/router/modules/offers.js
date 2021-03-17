/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const offersRoutes = {
  path: '/offers',
  component: Layout,
  redirect: '/offers',
  name: 'Offers',
  alwaysShow: true,
  meta: {
    title: 'Ogłoszenia',
    icon: 'el-icon-s-order',
    permissions: ['view menu administrator'],
  },
  children: [
    {
      path: 'offers',
      component: () => import('@/views/offers/List'),
      name: 'OfferList',
      meta: { title: 'Lista ofert', noCache: true, icon: 'user', permissions: ['manage offer'] },
    },
    {
      path: '/offers/edit',
      component: () => import('@/views/offers/Edit'),
      name: 'OfferEdit',
      meta: { title: 'Edytuj oferte', noCache: true, icon: 'user', permissions: ['manage offer'] },
      hidden: true,
    },
  ],
};

export default offersRoutes;
