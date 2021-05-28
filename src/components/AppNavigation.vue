<template>
    <nav>
        <ul class="ass1-header__menu">
            <li>
                <a href="#">Danh mục</a>
                <div class="ass1-header__nav" style="display: none">
                    <div class="container">
                        <ul>
                            <li v-for="item in categories" :key="item.id">
                                <router-link :to="getLinkCategory(item)">{{
                                    item.text
                                }}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="ass1-header__menu-transition"></div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
import { ChangeToSlug } from "../helpers";
export default {
    name: "app-navigation",
    methods: {
        getLinkCategory(item) {
            return {
                name: "home-page",
                query: {
                    category: ChangeToSlug(item.text),
                    tagIndex: item.id,
                },
            };
        },
    },
    computed: {
        categories() {
            return this.$store.state.modulePost.categories;
        },
    },
};
</script>

<style scoped>
.ass1-header__nav > .container ul {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
}
.ass1-header__nav > .container ul li {
    width: 25%;
}
.ass1-header__nav > .container ul li:first-child {
    margin-top: 8px;
}
</style>