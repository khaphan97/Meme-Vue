<template>
    <main>
        <div class="container" v-if="userInfor">
            <user-page-infor :userInfor="userInfor" :countPost="countPost" />
            <!--sections-->
            <div
                v-if="listPostOfUser && listPostOfUser.length"
                v-masonry
                column-width=".grid-sizer"
                transition-duration="0.3s"
                item-selector=".ass1-section__item"
                class="ass1-section__wrap row ass1-section__isotope-init"
            >
                <!--section-->
                <div class="grid-sizer"></div>
                <post-item
                    v-masonry-tile
                    v-for="item in listPostOfUser"
                    :key="item.PID"
                    :post="item"
                    class="col-lg-6"
                />
            </div>
            <div v-else>
                <h3 class="text-center p-4">
                    Bạn chưa đăng bất kì bài viết nào 
                </h3>
            </div>
        </div>
        <div v-else>
            <h3 class="text-center p-4">Không tồn tại user này</h3>
        </div>
    </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PostItem from "../components/PostItem.vue";
import UserPageInfor from "../components/UserPageInfor.vue";
export default {
    title: "Thông tin tài khoản",
    components: { PostItem, UserPageInfor },
    name: "user-page",
    data() {
        return {
            userId: this.$route.params.id,
            userInfor: null,
            listPostOfUser: [],
            containerId: 1,
        };
    },
    watch: {
        $route(to, from) {
            this.userId = to.params.id;
            this.fetchAllDataOfUser();
        },
    },
    created() {
        this.fetchAllDataOfUser();
    },
    methods: {
        ...mapActions(["getUserById", "getListPostByUserId", "setLoading"]),
        async fetchAllDataOfUser() {
            this.setLoading(true);
            let userId = this.userId;

            let promiseUser = this.getUserById(userId);
            let promisePostUser = this.getListPostByUserId(userId);

            let [resultUser, resultPostUser] = await Promise.all([
                promiseUser,
                promisePostUser,
            ]);
            this.setLoading(false);
            if (resultUser && resultPostUser) {
                if (resultUser.ok && resultPostUser.ok) {
                    this.userInfor = resultUser.data;
                    this.listPostOfUser = resultPostUser.posts;
                    this.$redrawVueMasonry();
                } else {
                    this.userInfor = null;
                }
            }
        },
    },
    computed: {
        countPost() {
            if (this.listPostOfUser && this.listPostOfUser.length) {
                return this.listPostOfUser.length;
            }
        },
    },
};
</script>

<style></style>
