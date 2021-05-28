export default {
    getListPost(state) {
        return state.listPosts;
    },
    getPostDetails(state ,  getters , rootState ) {
        if(state.postDetails){
            let userId = state.postDetails.post.USERID;
            let user = rootState.moduleUser.users[userId];
            let data = {
                post:{
                    ...state.postDetails.post,
                    fullname : user.fullname,
                    profilepicture : user.profilepicture,
                },
                categories : state.postDetails.categories
            }
            return data;
        }
    },
    getListComments(state) {
        return state.listComments;
    }
}