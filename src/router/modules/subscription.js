/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const subscriptionRoutes = {
  path: '/subscriptions',
  component: Layout,
  redirect: '/subscriptions',
  name: 'Subscriptions',
  alwaysShow: true,
  meta: {
    title: 'Subskrybcje',
    icon: 'el-icon-files',
    permissions: ['view menu administrator'],
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/subscriptions/List'),
      name: 'SubscriptionsList',
      meta: { title: 'Lista subskrybcji', noCache: true, icon: 'user', permissions: [] },
    },
    {
      path: 'edit',
      component: () => import('@/views/subscriptions/EditSubscription'),
      name: 'EditSubscription',
      hidden: true,
      meta: { title: 'Edytuj subskrypcje', noCache: true, icon: 'user', permissions: [] },
    },
  ],
};

export default subscriptionRoutes;
