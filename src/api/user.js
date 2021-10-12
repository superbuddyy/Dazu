import request from '@/utils/request';
import Resource from '@/api/resource';

class UserResource extends Resource {
    constructor() {
        super('users');
    }

    permissions(id) {
        return request({
            url: '/' + this.uri + '/' + id + '/permissions',
            method: 'get',
        });
    }

    updatePermission(id, permissions) {
        return request({
            url: '/' + this.uri + '/' + id + '/permissions',
            method: 'put',
            data: permissions,
        });
    }

    updatePassword(id, password) {
        console.log(password);
        return request({
            url: '/auth/reset-password',
            method: 'post',
            data: {
                id: id,
                password: password
            }
        });
    }
}

export { UserResource as default };