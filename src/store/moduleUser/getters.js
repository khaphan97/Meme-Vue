import { CONFIG_ACCESS_TOKEN } from '../../const';
import { parseJwt } from "../../helpers";

export default {
    isLogin(state) {
        if (parseJwt(state[CONFIG_ACCESS_TOKEN])) return true;
        return false;
    },
    currentUser(state) {
        return state.currentUser;
    },
    getListPostOfCurrentUser(state) {
        if( state.currentUser ){
            let currentUserId = state.currentUser.USERID;
            return state.posts[currentUserId];
        }
    }
};
