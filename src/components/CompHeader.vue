<template>
    <header>
        <div class="ass1-header">
            <div class="container">
                <router-link to="/" class="ass1-logo">
                    My Meme
                </router-link>
                <app-navigation />
                <comp-header-search/>
                <router-link to="/post-upload" class="ass1-header__btn-upload ass1-btn">
                    <i class="icon-Upvote"></i> Upload
                </router-link>
                <router-link
                    to="/login"
                    class="ass1-header__btn-upload ass1-btn"
                    v-if="!isLogin && !currentUser"
                >
                    Login
                </router-link>
                <div v-else-if="isLogin && currentUser" class="wrapper-user">
                    <a class="user-header">
                        <span class="avatar">
                            <img :src="getAvatar" alt="avatar" />
                        </span>
                        <router-link
                            :to="{
                                name: 'user-page',
                                params: { id: currentUser.USERID },
                            }"
                            class="email"
                            >{{ currentUser.email }}</router-link
                        >
                    </a>
                    <div @click="handleLogout" class="logout">Logout</div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import $ from "jquery";
import AppNavigation from "./AppNavigation.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import CompHeaderSearch from './CompHeaderSearch.vue';
export default {
    components: { AppNavigation, CompHeaderSearch },
    name: "comp-header",
    computed: {
        ...mapGetters(["isLogin", "currentUser"]),
        getAvatar() {
            if (this.currentUser) {
                if (this.currentUser.profilepicture)
                    return this.currentUser.profilepicture;
                return "/dist/images/avatar-01.png";
            }
        },
    },
    methods: {
        ...mapActions(["logout"]),
        handleLogout() {
            this.logout().then((result) => {
                this.$router.push("/login");
            });
        },
    },
    mounted() {
        $(".ass1-header__menu li > a").click(function (e) {
            // $(".ass1-header__nav").hide();
            e.preventDefault();
            $(this)
                .parent()
                .find(".ass1-header__nav")
                .slideToggle(300, "swing");
        });
        $(".ass1-header__menu li > a").click(function (e) {
            // $(".ass1-header__nav").hide();
            $(this).parents(".ass1-header__nav").slideUp(300, "swing");
        });
    },
};
</script>

<style scoped>
.user-header {
    position: relative;
    color: #1e1633;
    transition: all 0.2s ease;
    display: inline-block;
}
.user-header:hover {
    color: #3482e2;
}
.user-header > span {
    display: inline-block;
    vertical-align: middle;
}
.user-header .avatar {
    width: 35px;
    height: 35px;
    margin-right: 4px;
    border-radius: 100%;
    overflow: hidden;
}
.user-header .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.wrapper-user {
    position: relative;
}
.logout {
    right: 0;
    top: 100%;
    position: absolute;
    background-color: #fff;
    padding: 10px 30px;
    min-width: 150px;
    text-align: right;
    border-radius: 3px;
    box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
    z-index: 0;
    transition: all 0.3s ease;
    opacity: 0;
    pointer-events: none;
    cursor: pointer;
}
.wrapper-user .logout:hover,
.wrapper-user .user-header:hover + .logout {
    opacity: 1;
    z-index: 2;
    pointer-events: auto;
}
.ass1-header__nav > .container ul {
    flex-direction: row;
    flex-wrap: wrap;
}
.ass1-header__nav > .container ul li {
    flex: 0 0 25%;
    max-width: 25%;
}
.ass1-header__nav > .container ul li:first-child {
    margin-top: 8px;
}
.ass1-header__btn-upload {
    margin-right: 10px;
}
</style>
