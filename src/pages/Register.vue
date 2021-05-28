<template>
    <main>
        <div class="ass1-login">
            <div class="ass1-login__logo">
                <a href="index.html" class="ass1-logo">ZendVn Meme</a>
            </div>
            <div class="ass1-login__content">
                <p>Đăng ký một tài khoản</p>
                <div class="ass1-login__form">
                    <form action="#">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Tên hiển thị"
                            required=""
                            v-model="fullname"
                        />
                        <input
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            required=""
                            v-model="email"
                        />
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Mật khẩu"
                            required=""
                            v-model="password"
                        />
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Nhập lại mật khẩu"
                            required=""
                            v-model="repassword"
                        />
                        <div class="ass1-login__send">
                            <router-link to="/login">Đăng nhập</router-link>
                            <button
                                @click.prevent="handleSubmitRegister"
                                type="submit"
                                class="ass1-btn"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions } from "vuex";
import { notifyConfig } from "../plugins/notification";
export default {
    title: "Đăng ký",
    name: "register",
    data() {
        return {
            fullname: "",
            email: "",
            password: "",
            repassword: "",
        };
    },
    methods: {
        ...mapActions(["register"]),
        handleSubmitRegister() {
            let data = {
                fullname: this.fullname,
                email: this.email,
                password: this.password,
                repassword: this.repassword,
            };
            if (
                data.email &&
                data.fullname &&
                data.password &&
                data.repassword
            ) {
                this.register(data).then((res) => {
                    if (!res.ok) {
                        this.$notify(
                            notifyConfig(
                                "error",
                                "Đăng ký thất bại !!!",
                                res.error
                            )
                        );
                    } else {
                        this.$notify(
                            notifyConfig(
                                "success",
                                "Thành công",
                                "Chúc mừng bạn đã đăng ký thành công"
                            )
                        );
                        this.$router.push("/");
                    }
                });
            } else {
                this.$notify(
                    notifyConfig(
                        "error",
                        "Đăng ký thất bại !!!",
                        "Vui lòng nhập đầy đủ thông tin"
                    )
                );
            }
        },
    },
};
</script>

<style></style>
