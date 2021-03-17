import Resource from '@/api/resource';

class PostResource extends Resource {
  constructor() {
    super('admin/black-list');
  }
}

export { PostResource as default };
