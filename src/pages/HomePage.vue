<template>
	<main>
		<div class="container">
			<!--sections-->
			<div class="row">
				<!-- PostList -->
				<div class="col-lg-8">
					<post-list/>
				</div>

				<!-- Sidebar -->
				<div class="col-lg-4">
					<side-bar />
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PostList from "../components/PostList.vue";
import SideBar from "../components/SideBar.vue";
export default {
	components: { PostList, SideBar },
	title: 'Trang Chủ',
	name: "home-page",
	methods: {
		...mapActions(["getListPostHasPaging"]),
	},
	watch: {
		$route(to, from) {
			let tagIndex = to.query.tagIndex;
			this.getListPostHasPaging({ tagIndex });
		},
	},
	created(){
		let tagIndex = this.$route.query.tagIndex;
		this.getListPostHasPaging({ tagIndex});
	}
};
</script>

<style></style>
