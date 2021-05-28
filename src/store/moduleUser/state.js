import { CONFIG_ACCESS_TOKEN } from '../../const';
export default {
    [CONFIG_ACCESS_TOKEN]: localStorage.getItem(CONFIG_ACCESS_TOKEN),
    currentUser: null, //Login User 
    users : {}, //
    posts : {}
}