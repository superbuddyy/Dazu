import Resource from '@/api/resource';
import request from '@/utils/request';

class FooterResource extends Resource {
  constructor() {
    super('admin/footer');
  }

  update(id, resource) {
    return request({
      url: '/' + this.uri + '/' + id,
      method: 'post',
      data: resource,
    });
  }
}

export { FooterResource as default };
