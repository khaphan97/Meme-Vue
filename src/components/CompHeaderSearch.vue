<template>
    <div class="ass1-header__search">
        <form action="#" @submit.prevent="handleSearch">
            <label>
                <input
                    type="search"
                    name="search-text"
                    class="form-control"
                    placeholder="Nhập từ khóa ..."
                    v-model="strSearch"
                />
                <i class="icon-Search"></i>
            </label>
        </form>
    </div>
</template>

<script>
// import {errorNotify} from "../plugins/notification";

export default {
    name: "comp-header-search",
    data() {
        return {
            strSearch: "",
        };
    },
    methods: {
        handleSearch() {
            if (this.strSearch) {
                this.$router.push({
                    name: "search",
                    query: {
                        str: this.strSearch,
                    },
                });
                this.strSearch = '';
            } else {
                this.$router.push("/");
            }
        },
    },
};
</script>

<style>
</style>