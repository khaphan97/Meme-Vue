<template>
    <div class="search-page container">
        <div class="search-info my-4">
            <p>
                Từ khóa tìm kiếm : <strong>{{ str }}</strong>
            </p>
            <p>Tìm kiếm được ({{ listPostSearch.length }}) kết quả</p>
        </div>
        <div
            v-if="listPostSearch && listPostSearch.length"
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
                v-for="item in listPostSearch"
                :key="item.PID"
                :post="item"
                class="col-lg-6"
            />
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import PostItem from "../components/PostItem.vue";
export default {
    components: { PostItem },
    name: "search",
    data() {
        return {
            str: this.$route.query.str,
            listPostSearch: [],
        };
    },
    created() {
        this.checkQuery();
        this.fetchDataSearch();
    },
    watch: {
        $route(to, from) {
            this.str = to.query.str;
            this.fetchDataSearch();
        },
    },
    methods: {
        ...mapActions(["getListPostSearch"]),
        checkQuery() {
            if (!this.str) {
                this.$router.push("/");
            }
        },
        fetchDataSearch() {
            if (this.str) {
                this.getListPostSearch(this.str).then((res) => {
                    if (res.ok) {
                        this.listPostSearch = res.posts;
                        this.$redrawVueMasonry();
                    }
                });
            }
        },
    },
};
</script>

<style>
mark,
.mark {
    padding: 0;
    background-color: yellow;
}
</style>