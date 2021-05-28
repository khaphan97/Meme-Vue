<template>
    <div class="ass1-section__content" v-if="post">
        <p v-html="formatContent"></p>
        <div class="ass1-section__image">
            <router-link
                :to="{ name: 'post-detail', params: { id: post.PID } }"
            >
                <img :src="post.url_image" :alt="post.post_content" />
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "post-item-content",
    props: {
        post: { type: Object, default: {} },
    },
    data() {
        return {
            querySearch: this.$route.query.str,
        };
    },
    watch: {
        $route(to, from) {
            this.querySearch = to.query.str;
        },
    },
    computed: {
        formatContent() {
            if (this.querySearch) {
                console.log(this.querySearch);
                return this.post.post_content
                    .toLowerCase()
                    .split(this.querySearch)
                    .join(`<mark>${this.querySearch}</mark>`);
            } else {
                return this.post.post_content;
            }
        },
    },
};
</script>

<style></style>
