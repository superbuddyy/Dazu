import Resource from '@/api/resource';
import request from '@/utils/request';

class FooterResource extends Resource {
  constructor() {
    super('admin/footer');
  }
}

export { FooterResource as default };
