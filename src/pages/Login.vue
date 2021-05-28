<template>
    <main>
        <div class="ass1-login">
            <div class="ass1-login__logo">
                <router-link to="/" class="ass1-logo">ZendVn Meme</router-link>
            </div>
            <div class="ass1-login__content">
                <p>Đăng nhập</p>
                <div class="ass1-login__form">
                    <form action="#" @submit.prevent="handleSubmitLogin">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Email"
                            required=""
                            v-model="email"
                        />
                        <div class="ass1-input-copy">
                            <input
                                type="password"
                                class="form-control"
                                placeholder="Mật khẩu"
                                required=""
                                v-model="password"
                            />
                        </div>
                        <div class="ass1-login__send">
                            <router-link to="/register"
                                >Đăng ký một tài khoản</router-link
                            >
                            <button type="submit" class="ass1-btn">
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { errorNotify, successNotify } from "../plugins/notification";
import { mapActions } from "vuex";
export default {
    title: "Đăng nhập",
    name: "login",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        ...mapActions(["login"]),
        handleSubmitLogin() {
            let data = {
                email: this.email,
                password: this.password,
            };
            this.login(data).then((res) => {
                if (!res.ok) {
                    if (typeof res.error === "string") {
                        this.$notify(errorNotify(res.error))
                    } else {
                        this.$notify(errorNotify(res.error.join(" - ")))
                    }
                } else {
                    this.$router.push("/");
                }
            });
        },
    },
};
</script>

<style></style>
