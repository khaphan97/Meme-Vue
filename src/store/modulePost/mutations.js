export default {
    SET_LIST_POST(state, data) {
        state.listPosts = data
    },

    PUSH_LIST_POST(state, data) {
        state.listPosts = [...state.listPosts, ...data];
    },

    SET_POST_DETAIL(state,  data){
        state.postDetails = data;
    },
    SET_LIST_COMMENT(state, data){
        state.listComments = data;
    },
    PUSH_LIST_COMMENT(state, comment){
        state.listComments.push(comment);
    }
    
}