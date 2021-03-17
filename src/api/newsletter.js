import Resource from '@/api/resource';

class NewsletterResource extends Resource {
  constructor() {
    super('admin/newsletter');
  }
}

export { NewsletterResource as default };
