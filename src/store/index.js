import Vue from 'vue';
import Vuex from 'vuex';
import modulePost from './modulePost';
import moduleUser from './moduleUser';
Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state:{
        isLoading:false,
    },
    getters:{},
    mutations:{
        SET_LOADING(state, loading = false){
            state.isLoading = loading;
        }
    },
    actions:{
        setLoading({ commit }, loading = false){
            commit("SET_LOADING",loading);
        }
    },
    modules:{
        moduleUser,
        modulePost
    },
})


export default store;