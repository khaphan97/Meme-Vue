<template>
    <div id="app">
        <comp-header v-if="isRenderHeader" />
        <router-view> </router-view>
        <comp-footer v-if="isRenderFooter" />
        <loading :class="{ show: isLoading }" />
        <notifications group="notify" position="bottom right" width="500px" />
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CompFooter from "./components/CompFooter.vue";
import CompHeader from "./components/CompHeader.vue";
import Loading from "./components/Loading.vue";
export default {
    components: { CompHeader, CompFooter, Loading },
    name: "app",
    data() {
        return {};
    },
    computed: {
        ...mapState(["isLoading"]),
        isRenderHeader() {
            let routerName = this.$route.name;
            const listRoutesNoHeader = ["login", "register"];
            if (listRoutesNoHeader.indexOf(routerName) !== -1) return false;
            return true;
        },
        isRenderFooter() {
            let routerName = this.$route.name;
            const listRoutesNoFooter = ["home-page", "post-detail"];
            if (listRoutesNoFooter.indexOf(routerName) !== -1) return false;
            return true;
        },
    },
    methods: {
        ...mapActions(["checkLogin"]),
    },
    created() {
        this.checkLogin();
    },
};
</script>

<style>
.vue-notification {
    font-size: 20px !important;
}
</style>
