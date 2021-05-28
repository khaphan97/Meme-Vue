import axiosInstance from '../../plugins/axios'
import { parseJwt } from '../../helpers'
import { CONFIG_ACCESS_TOKEN } from '../../const';
export default {
    async getUserById({ commit }, userId) {
        try {
            var result = await axiosInstance.get("/member/member.php?userid=" + userId);
            if (result.data.status === 200) {
                commit("SET_USER_INFO", result.data.user);
                return {
                    ok: true,
                    error: null,
                    data: result.data.user
                }
            } else {
                return {
                    ok: false,
                    error: result.data.message
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },

    async login( { commit , dispatch } , { email = '' , password = '' } ){
        commit("SET_LOADING", true);
        try {
            let data = {
                email: email,
                password: password
            }
            let result          =   await axiosInstance.post("/member/login.php", data);
            commit("SET_LOADING", false);
            if(result.data.status === 200){
                commit("SET_USER_INFO", result.data.user);
                commit("SET_LOGIN_INFO", result.data);

                dispatch("getListPostByUserId", result.data.user.USERID);

                return {
                    ok: true,
                    error : null,
                }
            } else {
                return {
                    ok: false ,
                    error: result.data.error
                }
            }
        } catch (error) {
            commit("SET_LOADING", false);
            return {
                ok      : false,
                error   : error.message
            }
        }
    },

    async checkLogin( { commit, dispatch } ) {
        try {
            let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN)
            let userObj = parseJwt(tokenLocal);
            if(userObj){
                // let resultUser = await dispatch("getUserById", userObj.id);
                // let resultPostUser = await dispatch("getListPostByUserId", userObj.id);
                let promiseUser =  dispatch("getUserById", userObj.id);
                let promisePostUser = dispatch("getListPostByUserId", userObj.id);

                let [resultUser, resultPostUser] = await Promise.all([promiseUser, promisePostUser]);

                if(resultUser.ok && resultPostUser.ok) {
                    let data = {
                        user: resultUser.data,
                        token : tokenLocal
                    };
                    commit("SET_LOGIN_INFO", data);
                    return {
                        ok: true,
                        error: null,
                    }
                }
            }
        } catch (error) {
            return {
                ok : false,
                error : error.message
            }
        }
    },

    async logout({ commit }){
        commit("SET_LOGOUT");
    },

    async getListPostByUserId({ commit }, userId){
        try {
            let config = {
                params: {
                    userid : userId
                },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            };
            let result = await axiosInstance.get("/post/getListPostUserID.php", config);
            if(result.data.status === 200){
                let data = {
                    posts: result.data.posts,
                    userId : userId,
                }
                commit("SET_USER_POST", data)
                return {
                    ok : true,
                    posts : result.data.posts || [],
                    error : null
                }
            }
        } catch (error) {
            return {
                ok : false,
                error : error.message
            }
        }
    },

    async register({ commit, dispatch}, data){
        try {
            let result = await axiosInstance.post("/member/register.php", data);
            if(result.data.status === 200) {
                let objLoginInfo = {
                    user : result.data.user,
                    token : result.data.token
                }
                commit("SET_USER_INFO", result.data.user);
                commit("SET_LOGIN_INFO", objLoginInfo);

                dispatch("getListPostByUserId", result.data.user.USERID);


                return {
                    ok : true,
                    data : result.data,
                    error : null
                }
            } else {
                return {
                    ok : false,
                    error : result.data.error
                }
            }
        } catch (error) {
            return {
                ok : false,
                error : error.message
            }
        }
    },

    async updateProfile({ commit}, {fullname = '', description = '', gender = '', objFile = null}){
        try {
            commit("SET_LOADING", true);
            let bodyFormData = new FormData();

            bodyFormData.append('fullname', fullname);
            bodyFormData.append('description', description);
            bodyFormData.append('gender', gender);
            if(objFile){
                bodyFormData.append('avatar', objFile);
            }

            let configAxios = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }

            let result = await axiosInstance.post("/member/update.php", bodyFormData, configAxios);   

            if (result.data.status === 200) {
                commit("SET_LOADING", false);
                commit("SET_CURRENT_USER", result.data.user)
                return {
                    ok : true,
                    user : result.data.user
                }
            } else {
                return {
                    ok : false,
                    error : result.data.error
                }
            }
        } catch (error) {
            return {
                ok : false,
                error : error.message
            }
        }
    },

    async changePassword( { commit }, data){
        commit("SET_LOADING", true);
        try {
            let configAxios = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            let result = await axiosInstance.post("/member/password.php", data , configAxios)

            if(result.data.status === 200){
                commit("SET_LOADING", false);
                return {
                    ok : true,
                    message : result.data.message
                }
            } else {
                return {
                    ok : false,
                    error : result.data.message
                }
            }
        } catch (error) {
            return {
                ok : false,
                error : error.message
            }
        }
    }

}