import { login, logout, getInfo, sendmail, getToken, resetPassword } from '@/api/auth';
import { isLogged, setLogged, removeToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';
import store from '@/store';

const state = {
    id: null,
    user: null,
    token: isLogged(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    permissions: [],
    token_time: null
};

const mutations = {
    SET_ID: (state, id) => {
        state.id = id;
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions;
    },
    SET_TOKENTIME: (state, tokentime) => {
        state.token_time = tokentime;
    },
};

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { email, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ email: email.trim(), password: password })
                .then(response => {
                    setLogged('1');

                    const { roles, name, avatar, introduction, permissions, id, token } = response;
                    window.localStorage.setItem('authtoken', token);
                    commit('SET_TOKEN', token);
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.then)
                .then(response => {
                    const { data } = response;

                    if (!data) {
                        reject('Verification failed, please Login again.');
                    }

                    const { roles, name, avatar, introduction, permissions, id } = data;
                    // roles must be a non-empty array
                    if (!roles || roles.length <= 0) {
                        reject('getInfo: roles must be a non-null array!');
                    }

                    commit('SET_ROLES', roles);
                    commit('SET_PERMISSIONS', permissions);
                    commit('SET_NAME', name);
                    commit('SET_AVATAR', avatar);
                    commit('SET_INTRODUCTION', introduction);
                    commit('SET_ID', id);
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // user logout
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout()
                .then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    removeToken();
                    resetRouter();
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            removeToken();
            resolve();
        });
    },

    // Dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            // const token = role + '-token';

            // commit('SET_TOKEN', token);
            // setLogged(token);

            // const { roles } = await dispatch('getInfo');

            const roles = [role.name];
            const permissions = role.permissions.map(permission => permission.name);
            commit('SET_ROLES', roles);
            commit('SET_PERMISSIONS', permissions);
            resetRouter();

            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('permission/generateRoutes', { roles, permissions });

            // dynamically add accessible routes
            router.addRoutes(accessRoutes);

            resolve();
        });
    },
    sendmail({ commit }, data) {
        const { email } = data;

        return new Promise((resolve, reject) => {
            sendmail({ email: email.trim() })
                .then(response => {
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },
    getToken({ commit }, token) {
        return new Promise((resolve, reject) => {
            getToken({ token })
                .then(response => {
                    // const { updated_at } = response;
                    // const today = new Date();
                    // const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    // const dateTime = date + ' ' + time;
                    // let timestamp = dateTime;
                    // console.log('timestamp', timestamp)
                    // console.log('upadate_at', updated_at)
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },
    resetPassword({ commit }, data) {
        return new Promise((resolve, reject) => {
            resetPassword(data)
                .then(response => {
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};