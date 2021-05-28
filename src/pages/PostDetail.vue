<template>
    <main>
        <div class="container">
            <!--sections-->
            <div class="row">
                <div class="col-lg-8">
                    <!--section-->
                    <div
                        class="ass1-section__list"
                        v-if="getPostDetails && getPostDetails.post"
                    >
                        <div class="ass1-section">
                            <post-item :post="getPostDetails.post" />
                            <!-- <post-feeling /> -->
                            <ul class="categories">
                                <li
                                    class="categories__item"
                                    v-for="item in getPostDetails.categories"
                                    :key="item.TAGID"
                                >
                                    <router-link
                                        class="categories__item_link"
                                        :to="getLinkCategory(item)"
                                        >{{ item.tag_value }}</router-link
                                    >
                                </li>
                            </ul>
                        </div>
                        <post-add-cmt />

                        <post-comments />
                    </div>
                </div>
                <div class="col-lg-4">
                    <side-bar />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ChangeToSlug } from "../helpers";
import PostAddCmt from "../components/PostAddCmt.vue";
import PostComments from "../components/PostComments.vue";
import PostFeeling from "../components/PostFeeling.vue";
import PostItem from "../components/PostItem.vue";
import PostItemContent from "../components/PostItemContent.vue";
import PostItemFooter from "../components/PostItemFooter.vue";
import PostItemHead from "../components/PostItemHead.vue";
import SideBar from "../components/SideBar.vue";
export default {
    title: "Chi tiết bài viết",
    components: {
        PostItem,
        PostFeeling,
        PostAddCmt,
        PostComments,
        SideBar,
        PostItemHead,
        PostItemContent,
        PostItemFooter,
    },
    name: "post-detail",
    data() {
        return {
            postId: this.$route.params.id,
        };
    },
    methods: {
        ...mapActions(["getPostDetailById"]),
        fetchDataPostDetail() {
            this.getPostDetailById(this.postId).then((res) => {
                if (!res.ok) {
                    //Đẩy qua trang chủ
                    this.$router.push("/");
                }
            });
        },
        getLinkCategory(category) {
            return {
                name: "home-page",
                query: {
                    category: ChangeToSlug(category.tag_value),
                    tagIndex: category.tag_index,
                },
            };
        },
    },
    computed: {
        ...mapGetters(["getPostDetails"]),
    },
    watch: {
        $route(to, from) {
            this.postId = to.params.id;
            this.fetchDataPostDetail();
        },
    },
    created() {
        // Load lai trang lan dau tien
        this.fetchDataPostDetail();
    },
};
</script>

<style scoped>
.categories__item {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: rgb(245 245 245);
    border-radius: 10px;
}
.categories__item:hover {
    background-color: rgba(165, 165, 165, 0.479);
    transition: 0.5s;
}
</style>
