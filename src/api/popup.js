import Resource from '@/api/resource';
import request from '@/utils/request';

class PopupResource extends Resource {
  constructor() {
    super('popups');
  }
  activate(id, query) {
    return request({
      url: 'popups/' + id + '/activate',
      method: 'patch',
      params: query,
    });
  }
  deactivate(id, query) {
    return request({
      url: 'popups/' + id + '/deactivate',
      method: 'patch',
      params: query,
    });
  }
  edit(id, query) {
    return request({
      url: 'popups/' + id,
      method: 'post',
      data: query,
    });
  }
}

export { PopupResource as default };
