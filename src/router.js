import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "./pages/HomePage.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import PostDetail from "./pages/PostDetail.vue";
import PostUpload from "./pages/PostUpload.vue";
import UserPage from "./pages/UserPage.vue";
import UserProfile from "./pages/UserProfile.vue";
import ChangePassword from "./pages/ChangePassword.vue";
import Search from "./pages/search.vue";

import { ifAuthenticated , ifNotAuthenticated} from './plugins/authenticates'

Vue.use(VueRouter);

const routes = [
	{
		path : "/",
		name : "home-page",
		component : HomePage
	},
	{
		path : "/login",
		name : "login",
		component : Login,
		beforeEnter: ifNotAuthenticated
	},
	{
		path : "/register",
		name : "register",
		component : Register,
		beforeEnter: ifNotAuthenticated
	},
	{
		path : "/user/:id/update-profile",
		name : "user-profile",
		component : UserProfile,
		beforeEnter : ifAuthenticated
	},
	{
		path : "/user/:id",
		name : "user-page",
		component : UserPage,
		beforeEnter : ifAuthenticated
	},
	{
		path : "/user/:id/change-password",
		name : "change-password",
		component : ChangePassword
	},
	{
		path : "/post-detail/:id",
		name : "post-detail",
		component : PostDetail
	},
	{
		path : "/post-upload",
		name : "post-upload",
		component : PostUpload,
		beforeEnter : ifAuthenticated
	},
	{
		path : "/search",
		name : "search",
		component : Search
	}
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
