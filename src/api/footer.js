import Resource from '@/api/resource';
import request from '@/utils/request';

class PostResource extends Resource {
  constructor() {
    super('admin/footers');
  }

  store(resource) {
    return request({
      url: '/' + this.uri,
      method: 'post',
      data: resource,
      headers: { 'Content-Type': 'multipart/form-data' },
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
}

export { PostResource as default };
