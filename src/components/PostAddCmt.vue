<template>
    <div class="ass1-add-comment">
        <form action="#" @submit.prevent="handleAddComment">
            <b-textarea
                type="text"
                placeholder="Thêm một bình luận"
                v-model="comment"
            >
            </b-textarea>
        </form>
        <div class="ass1-add-comment__content">
            <a
                @click.prevent="handleAddComment"
                href="#"
                class="ass1-add-comment__btn-save ass1-btn-icon"
            >
                <span>{{ renderMaxLength }}</span>
                <i class="icon-Submit_Tick"></i
            ></a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { errorNotify, successNotify } from "../plugins/notification";
export default {
    name: "post-add-cmt",
    data() {
        return {
            comment: "",
            maxLength: 180,
            postId: this.$route.params.id,
        };
    },
    watch: {
        $route(to, from) {
            this.postId = to.params.id;
        },
    },
    methods: {
		...mapActions(['addNewComment']),
        handleAddComment() {
            if (this.comment.length && this.comment.length <= this.maxLength) {
				let data = {
					comment	: this.comment,
					postId 	: this.postId
				}
				console.log(data);
				this.addNewComment(data).then(response => {
					console.log(response);
					if(response.ok){
						this.$notify(successNotify("Thêm bình luận thành công"));
						this.comment = '';
					} else {
						this.$notify(errorNotify("Đăng bình luận không thành công"))
					}
				})
            } else {
				this.$notify(errorNotify("Đăng bình luận không thành công"))
            }
        },
    },
    computed: {
        renderMaxLength() {
            return this.maxLength - this.comment.length;
        },
    },
};
</script>

<style></style>
