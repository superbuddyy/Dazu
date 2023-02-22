import request from '@/utils/request';

export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: data,
    });
}

export function getInfo(token) {
    return request({
        url: '/user',
        method: 'get',
    });
}

export function sendmail(data) {
    return request({
        url: '/auth/sendmail',
        method: 'post',
        data: {
            email: data.email
        },
    });
}

export function logout() {
    return request({
        url: '/auth/logout',
        method: 'post',
    });
}

export function getToken(data) {
    return request({
        url: '/auth/getToken',
        method: 'post',
        data: {
            token: data.token
        },
    });
}

export function resetPassword(data) {
    return request({
        url: '/auth/resetPassword',
        method: 'post',
        data: {
            password: data.password,
            token: data.token
        },
    });
}

export function csrf() {
    return request({
        url: '/sanctum/csrf-cookie',
        method: 'get',
    });
}