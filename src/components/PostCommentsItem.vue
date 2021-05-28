<template>
    <div class="ass1-comments__section" v-if="comment">
        <a href="#" class="ass1-comments__avatar ass1-avatar"
            ><img :src="renderAvatar" alt=""
        /></a>
        <div class="ass1-comments__content">
            <router-link
                :to="{ name: 'user-page', params: { id: comment.USERID } }"
                class="ass1-comments__name mr-2"
                >{{ comment.fullname }}</router-link
            >
            <span class="ass1-comments__passed">{{ formatTimeAdded }}</span>
            <!-- <a href="#" class="ass1-comments__btn-reply ass1-btn-icon" ><i class="icon-Reply">Trả lời</i></a > -->
            <p>
                {{ comment.comment }}
            </p>
            <div class="ass1-comments__info">
                <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"
                    ><i class="icon-Upvote"></i><span>901</span></a
                >
                <a href="#" class="ass1-comments__btn-down ass1-btn-icon"
                    ><i class="icon-Downvote"></i><span>36</span></a
                >
                <a href="#" class="ass1-comments__btn-flag ass1-btn-icon"
                    ><i class="icon-Flag"></i
                ></a>
            </div>
            <!-- comment -->
            <!-- <div class="ass1-comments__section">
		<a href="#" class="ass1-comments__avatar ass1-avatar"
		  ><img src="/dist/images/avatar-10.png" alt=""
		/></a>
		<div class="ass1-comments__content">
		  <a href="#" class="ass1-comments__name">Bầu trời</a>
		  <span class="ass1-comments__passed">1 hour ago</span>
		  <p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
			debitis cumque nostrum blanditiis iusto amet illo necessitatibus, ea
			quibusdam quidem quod, doloribus, voluptatem est saepe nulla ex
			optio ut quas.
		  </p>
		  <div class="ass1-comments__info">
			<a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"
			  ><i class="icon-Upvote"></i><span>901</span></a
			>
			<a href="#" class="ass1-comments__btn-down ass1-btn-icon"
			  ><i class="icon-Downvote"></i><span>36</span></a
			>
		  </div>
		</div>
	  </div> -->
            <!--comment-->
            <!-- <div class="ass1-comments__section">
		<a href="#" class="ass1-comments__avatar ass1-avatar"
		  ><img src="/dist/images/avatar-10.png" alt=""
		/></a>
		<div class="ass1-comments__content">
		  <a href="#" class="ass1-comments__name">Nguyễn A</a>
		  <span class="ass1-comments__passed">39 mins ago</span>
		  <p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
			voluptatibus distinctio possimus qui, incidunt illum nesciunt ad!
			Cum hic pariatur, velit, dignissimos ratione necessitatibus natus
			neque sed esse, voluptatum ipsum.
		  </p>
		  <div class="ass1-comments__info">
			<a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"
			  ><i class="icon-Upvote"></i><span>256</span></a
			>
			<a href="#" class="ass1-comments__btn-down ass1-btn-icon"
			  ><i class="icon-Downvote"></i><span>12</span></a
			>
		  </div>
		</div>
	  </div> -->
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: "post-comments-item",
    props: {
        comment: { type: Object, default: null },
    },
    computed: {
        formatTimeAdded() {
            moment.locale("vi");
            return moment(this.comment.time_added).fromNow();
        },
		renderAvatar() {
			if(this.comment.profilepicture){
				return this.comment.profilepicture
			} return "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
		}
    },
};
</script>

<style></style>
