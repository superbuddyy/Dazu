import Resource from '@/api/resource';

class SubscriptionResource extends Resource {
  constructor() {
    super('admin/subscriptions');
  }
}

export { SubscriptionResource as default };
