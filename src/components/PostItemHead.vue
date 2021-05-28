<template>
    <div class="ass1-section__head">
        <router-link :to="getUserLink" class="ass1-section__avatar ass1-avatar"
            ><img :src="post.profilepicture" :alt="post.fullname"
        /></router-link>
        <div>
            <router-link
                :to="getUserLink"
                class="ass1-section__section__name"
                v-html="formatFullName"
                ></router-link
            >
            <span class="ass1-section__passed">{{ formatTimeAdded }}</span>
        </div>
        <router-link :to="getUserLink" class="ass1-section__link ass1-btn-icon"
            ><i class="icon-Link"></i
        ></router-link>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: "post-item-head",
    data(){
        return {
            querySearch: this.$route.query.str
        }
    },
    props: {
        post: { type: Object, default: {} },
    },
     watch: {
        $route(to, from) {
            this.querySearch = to.query.str;
        },
    },
    computed: {
        getAvatar() {
            if (this.post.profilepicture) return this.post.profilepicture;
            return "/dist/images/avatar-02.png";
        },
        getUserLink() {
            let id = this.post.USERID || 1;
            return {
                name: "user-page",
                params: { id: id },
            };
        },
        formatTimeAdded() {
            moment.locale("vi");
            return moment(this.post.time_added).fromNow();
        },
        formatFullName(){
            if(this.querySearch){
                console.log(this.querySearch);
                return this.post.fullname.toLowerCase().split(this.querySearch).join(`<mark>${this.querySearch}</mark>`);
            } else {
                return this.post.fullname;
            }
        }
    },
};
</script>

<style>
.ass1-section__section__name{
    text-transform: capitalize;
}

</style>
