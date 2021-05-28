<template>
    <aside class="ass1-aside">
        <div class="ass1-content-head__t">
            <div>Bài viết gần đây của bạn.</div>
        </div>
        <div v-if="!isLogin">
            Vui lòng đăng nhập để xem nội dung này
            <router-link to="/login">Đăng nhập</router-link>
        </div>
        <template v-else-if="isLogin && getListPostOfCurrentUser">
            <post-item
                v-for="item in getListPostOfCurrentUser"
                :key="item.PID"
                :post="item"
            />
        </template>
    </aside>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import PostItem from "./PostItem.vue";
export default {
    components: { PostItem },
    name: "side-bar",
    computed: {
        ...mapGetters(["isLogin", "getListPostOfCurrentUser"]),
    },
};
</script>

<style></style>
