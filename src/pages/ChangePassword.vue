<template>
    <main>
        <div class="ass1-login">
            <div class="ass1-login__content">
                <p>Đổi mật khẩu</p>
                <div class="ass1-login__form">
                    <form action="#" @submit.prevent="handleChangePassword">
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Mật khẩu cũ"
                            autocomplete="off"
                            v-model="oldPassword"
                        />
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Mật khẩu mới"
                            v-model="newPassword"
                        />
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Xác nhận mật khẩu mới"
                            v-model="reNewPassword"
                        />
                        <div class="ass1-login__send justify-content-center">
                            <button type="submit" class="ass1-btn">Gửi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { errorNotify, successNotify } from "../plugins/notification";
import { mapActions, mapGetters } from "vuex";
export default {
    title: "Đổi mật khẩu",
    name: "change-password",
    data() {
        return {
            userId: this.$route.params.id,
            oldPassword: "",
            newPassword: "",
            reNewPassword: "",
        };
    },
    created() {
        this.checkIsCurrentUser();
    },
    watch: {
        $route(to, from) {
            this.userId = to.params.id;
            this.checkIsCurrentUser();
        },
    },
    computed: {
        ...mapGetters(["currentUser"]),
    },
    methods: {
		...mapActions(['changePassword']),
        checkIsCurrentUser() {
            if (this.currentUser && this.userId) {
                if (this.currentUser.USERID == this.userId) {
                    return true;
                } else {
                    this.$router.push("/");
                }
            }
        },
        handleChangePassword() {
            let { oldPassword, newPassword, reNewPassword } = this;
            if ((oldPassword, newPassword, reNewPassword)) {
				if(oldPassword == newPassword){
                	this.$notify(errorNotify("Mật khẩu mới không được trùng với mật khẩu cũ"));
				} else if (newPassword != reNewPassword){
                	this.$notify(errorNotify("Mật khẩu nhập lại không khớp"));
				} else {
					let data = { oldPassword, newPassword, reNewPassword}
					this.changePassword(data).then((res) =>{
						if(res.ok){
							this.$notify(successNotify(res.message));
						} else {
							this.$notify(errorNotify(res.error))
						}
					})
				}
            } else {
                this.$notify(errorNotify("Vui lòng nhập đầy đủ thông tin"));
            }
        },
    },
};
</script>

<style></style>
