import Resource from '@/api/resource';
import request from '@/utils/request';

class StatResource extends Resource {
  constructor() {
    super('admin/stats');
  }

  statsGeneral() {
    return request({
      url: '/' + this.uri + '/general',
      method: 'get',
    });
  }
}

export { StatResource as default };
