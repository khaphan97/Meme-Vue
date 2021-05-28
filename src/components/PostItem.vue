<template>
	<div class="ass1-section__item">
	  <div class="ass1-section" v-if="post">
		<post-item-head :post="post" />
		<post-item-content :post="post" />
		<post-item-footer :post="post" />
	  </div>
	</div>
</template>

<script>
import PostItemContent from "./PostItemContent.vue";
import PostItemFooter from "./PostItemFooter.vue";
import PostItemHead from "./PostItemHead.vue";
export default {
	components: { PostItemHead, PostItemContent, PostItemFooter },
	name: "post-item",
	props: {
		post: { type: Object, default: null }
	}
};
</script>

<style></style>
