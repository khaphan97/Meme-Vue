<template>
    <div class="ass1-comments" v-if="getListComments">
        <div class="ass1-comments__head">
            <div class="ass1-comments__title">{{ getListComments.length }} Bình luận</div>
            <div class="ass1-comments__options">
                <span>Sắp xếp theo:</span>
                <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"
                    ><i class="icon-Upvote"></i
                ></a>
                <a href="#" class="ass1-comments__btn-down ass1-btn-icon"
                    ><i class="icon-Downvote"></i
                ></a>
                <a href="#" class="ass1-comments__btn-expand ass1-btn-icon"
                    ><i class="icon-Expand_all"></i
                ></a>
            </div>
        </div>
        <post-comments-item
            v-for="comment in getListComments"
            :key="comment.CID"
            :comment="comment"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PostCommentsItem from "./PostCommentsItem.vue";
export default {
    components: { PostCommentsItem },
    name: "post-comments",
    data() {
        return {
            postId: this.$route.params.id,
        };
    },
    computed: {
        ...mapGetters(["getListComments"]),
    },
    methods: {
        ...mapActions(["getListCommentByPostID"]),
        fechtListComment() {
            let postId = this.postId || null;
            if (postId) {
                this.getListCommentByPostID(postId);
            }
        },
    },
    created() {
        this.fechtListComment();
    },
    watch: {
        $route(to, from) {
            this.postId = to.params.id;
            this.fechtListComment();
        },
    },
};
</script>

<style></style>
