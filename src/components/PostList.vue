<template>
    <div class="ass1-section__list">
        <post-item
            v-for="(post, index) in getListPost"
            :key="index"
            :post="post"
        />
        <button @click="handleLoadMore" v-if="getListPost && getListPost.length" class="load-more ass1-btn"><span>Xem thêm</span></button>
		<h3 v-else >Không có bài viết nào trong danh mục này !!!</h3>
    </div>
</template>

<script>
import PostItem from "./PostItem.vue";
import { mapActions, mapGetters } from "vuex";
import {PAGE_SIZE , CURRENT_PAGE} from "../const";
export default {
    components: { PostItem },
    name: "post-list",
    data(){
        return {
            pagesize : PAGE_SIZE ,
            currPage : CURRENT_PAGE,
            tagIndex : parseInt(this.$route.query.tagIndex)
        }
    },
    computed: {
        ...mapGetters(["getListPost"]),
    },
    methods:{
        ...mapActions(['getListPostHasPaging']),
        handleLoadMore(){
            this.currPage += 1;
            let obj = {
                pagesize : this.pagesize,
                currPage : this.currPage,
                tagIndex : this.tagIndex
            }
            this.getListPostHasPaging(obj);

        }
    },
    watch: {
		$route(to, from) {
			this.tagIndex = to.query.tagIndex;
            this.currPage = 1;
		},
	},
};
</script>

<style></style>
