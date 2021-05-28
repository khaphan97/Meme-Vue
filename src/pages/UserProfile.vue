<template>
    <main>
        <div class="ass1-login">
            <div class="ass1-login__content">
                <p>Cập nhật thông tin tài khoản</p>

                <div class="ass1-login__form">
                    <div class="avatar">
                        <img :src="getAvatar" />
                    </div>
                    <form
                        action="#"
                        v-if="currentUser"
                        @submit.prevent="handleEditProfile"
                    >
                        <input
                            :value="currentUser.fullname"
                            @input="fullname = $event.target.value"
                            type="text"
                            class="form-control"
                            placeholder="Tên ..."
                            required=""
                        />

                        <select
                            @change="gender = $event.target.value"
                            :value="currentUser.gender"
                            class="form-control"
                        >
                            <option value="">Giới tính</option>
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>
                        </select>
                        <input
                            @change="uploadAvatar"
                            type="file"
                            name="avatar"
                            placeholder="Ảnh đại diện"
                            class="form-control"
                        />
                        <textarea
                            @input="description = $event.target.value"
                            :value="currentUser.description"
                            class="form-control"
                            cols="30"
                            rows="5"
                            placeholder="Mô tả ngắn ..."
                        ></textarea>
                        <div class="ass1-login__send justify-content-center">
                            <button type="submit" class="ass1-btn">
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { notifyConfig, successNotify } from "../plugins/notification";
export default {
    title: "Cập nhật tài khoản",
    name: "user-profile",
    data() {
        return {
            fullname: "",
            description: "",
            gender: "",
            avatar: {
                objFile: null,
                base64URL: "",
            },
            userId: this.$route.params.id,
        };
    },
    watch: {
        $route(to, from) {
            this.userId = to.params.id;
            this.checkIsCurrentUser();
        },
    },
    computed: {
        ...mapGetters(["currentUser"]),
        getAvatar() {
            if (this.avatar.base64URL === "" && this.currentUser) {
                return this.currentUser.profilepicture;
            } else {
                return this.avatar.base64URL;
            }
        },
    },
    methods: {
        ...mapActions(["updateProfile"]),
        checkIsCurrentUser() {
            if (this.currentUser && this.userId) {
                if (this.currentUser.USERID == this.userId) {
                    return true;
                } else {
                    this.$router.push("/");
                }
            }
        },
        handleEditProfile() {
            if (!this.fullname) this.fullname = this.currentUser.fullname;
            if (!this.gender) this.gender = this.currentUser.gender;
            if (!this.description)
                this.description = this.currentUser.description;

            if (this.fullname && this.description && this.gender) {
                let data = {
                    fullname: this.fullname,
                    description: this.description,
                    gender: this.gender,
                };
                if (this.avatar.objFile) {
                    data.objFile = this.avatar.objFile;
                }
                this.updateProfile(data).then((res) => {
                    if (res.ok) {
                        this.$notify(successNotify("Cập nhật tài khoản thành công"));
                    } else {
                        this.$notify(
                            notifyConfig("error", "Thất bại", res.error)
                        );
                    }
                });
            }
        },
        uploadAvatar(e) {
            if (e.target.files && e.target.files.length > 0) {
                const fileAvatar = e.target.files[0];
                // đọc file ảnh
                let reader = new FileReader();
                reader.addEventListener( "load",() => {
                        let previewSrc = reader.result;
                        this.avatar.base64URL = previewSrc;
                        this.avatar.objFile = fileAvatar;
                    },
                    false
                );

                if (fileAvatar) {
                    reader.readAsDataURL(fileAvatar);
                }
            }
        },
    },
    created() {
        this.checkIsCurrentUser();
    },
};
</script>

<style></style>
