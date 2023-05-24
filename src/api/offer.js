import Resource from '@/api/resource';
import request from '@/utils/request';

class OfferResource extends Resource {
  constructor() {
    super('admin/offers');
  }

  changeStatus(slug, status, note) {
    return request({
      url: '/' + this.uri + '/' + slug + '?status=' + status,
      method: 'patch',
      data: { note: note },
    });
  }

  changePackage(slug, status, note) {
    return request({
      url: '/' + this.uri + '/' + slug + '?subscription=' + status,
      method: 'patch',
      data: { note: note },
    });
  }
  
  update(slug, resource) {
    return request({
      url: '/' + this.uri + '/' + slug,
      method: 'post',
      data: resource,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  delayedDelete(slug) {
    return request({
      url: '/' + this.uri + '/' + slug + '?delayedDelete=6',
      method: 'patch',
      data: { note: null },
    });
  }
}

export { OfferResource as default };
