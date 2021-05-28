import axiosInstance from '../../plugins/axios'
import { PAGE_SIZE , CURRENT_PAGE } from '../../const'
import { CONFIG_ACCESS_TOKEN } from '../../const';

export default {
	async getListPostHasPaging({ commit }, { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE , tagIndex = null}) {
		commit("SET_LOADING",true);
		try {
			let config = {
				params: {
					pagesize,
					currPage,
					tagIndex
				}
			}
			if(tagIndex){
				var result = await axiosInstance.get(`/post/getListByCategory.php`, config);
			} else{
				var result = await axiosInstance.get(`/post/getListPagination.php`,config);
			}
			if (result.data.status == 200) {
				if(currPage == 1){
					commit("SET_LIST_POST", result.data.posts);
				} else if(currPage > 1) {
					commit("PUSH_LIST_POST", result.data.posts);
				}
			} 
			commit("SET_LOADING",false );
		} catch (error) {
			console.log(error);
		}
	},

	async getPostDetailById( { commit , dispatch }, postId){
		commit("SET_LOADING", true);
		try {
			var result = await axiosInstance.get(`/post/post.php?postid=${postId}`);
			if(result.data.status === 200){
				// Goi tiep sang API cua user
				let resultUser = await dispatch("getUserById", result.data.data.post.USERID)
				commit("SET_POST_DETAIL", result.data.data);
				commit("SET_LOADING", false);
				return {
					ok : true,
					error : null,
					data : result.data.data
				}
			}
		} catch (error) {
			commit("SET_LOADING", false);
			return {
				ok : false,
				error : error.message
			}
		}
	},
	async getListPostSearch({commit}, searchStr){
		commit("SET_LOADING", true);
		try {
			let result = await axiosInstance.get("/post/search.php?query=" + searchStr);
			if(result.data.status === 200) {
				commit("SET_LOADING", false);
				return {
					ok : true,
					posts : result.data.posts
				}
			} else {
				return {
					ok : false,
				}
			}
		} catch (error) {
			commit("SET_LOADING", false);
			return {
				ok : false,
				error : error.message
			}
		}
	},

	async createPost( { commit }, {obj_image = null  , post_content = '' , url_image = '' , category = ''} ){
		commit("SET_LOADING", true);
		try {
			let bodyFormData = new FormData();
			bodyFormData.append('category', category);
			bodyFormData.append('post_content', post_content);
			bodyFormData.append('url_image', url_image);

			if(obj_image){
				bodyFormData.append('obj_image', obj_image);
			}

			let configAxios = {
				headers:{
					'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
				}
			}

			let result = await axiosInstance.post("/post/addNew.php", bodyFormData , configAxios);
			commit("SET_LOADING", false);

			if(result.data.status === 200) {
				return {
					ok : true,
				}
			} else {
				return {
					ok :  false,
					error : result.data.error
				}
			}
		} catch (error) {
			commit("SET_LOADING", false);
			return {
				ok : false,
				error : error.message
			}
		}
	},

	async getListCommentByPostID({commit}, postID){
		try {
			let result = await axiosInstance.get("/comment/comments.php?postid=" + postID);
			if(result.data.status === 200){
				commit("SET_LIST_COMMENT", result.data.comments)
				return {
					ok : true,
					comments : result.data.comments
				}
			}
		} catch (error) {
			return {
				ok : false,
				error : error.message
			}
		}
	},

	async addNewComment({commit, rootState},  {comment = '', postId = null}){
		commit("SET_LOADING", true);
		try {
			let data = {
				comment,
				postid: postId
			};
			let configAxios = {
				headers:{
					'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
				}
			};
			let result = await axiosInstance.post("/comment/add_new.php", data, configAxios);
			commit("SET_LOADING", false);
			if(result.data.status === 200){
				let comment = {
					...result.data.body,
					fullname: rootState.moduleUser.currentUser.fullname,
					profilepicture : rootState.moduleUser.currentUser.profilepicture
				}
				commit('PUSH_LIST_COMMENT', comment);
				return {
					ok : true,
					comment : comment
				}
			} else {
				return {
					ok : false,
					error : result.data.error
				}
			}
		} catch (error) {
			commit("SET_LOADING", false);
			return {
				ok : false,
				error : error.message
			}
		}
	}


}
