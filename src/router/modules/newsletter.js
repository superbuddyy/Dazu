/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const newsletterRoutes = {
  path: '/newsletter',
  component: Layout,
  redirect: '/newsletter',
  name: 'NewsletterForm',
  alwaysShow: true,
  meta: {
    title: 'Newsletter',
    icon: 'el-icon-message',
    permissions: ['view menu administrator'],
  },
  children: [
    {
      path: 'newsletter',
      component: () => import('@/views/newsletter/List'),
      name: 'NewsletterList',
      meta: { title: 'Lista newsletterów', noCache: false, icon: 'user' },
    },
    {
      path: 'newsletter/add',
      component: () => import('@/views/newsletter/NewsletterForm'),
      name: 'NewsletterForm',
      meta: { title: 'Dodaj newsletter', noCache: false, icon: 'user' },
    },
  ],
};

export default newsletterRoutes;
