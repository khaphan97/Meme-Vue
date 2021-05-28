<template>
    <main>
        <div class="container">
            <!--sections-->
            <div class="row">
                <div class="col-lg-8">
                    <!--section-->
                    <div class="ass1-section ass1-section__edit-post">
                        <div class="ass1-section__content">
                            <form action="#">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control ttg-border-none"
                                        placeholder="https://"
                                        v-model="url_image"
                                    />
                                </div>
                                <div class="form-group">
                                    <textarea
                                        type="text"
                                        class="form-control ttg-border-none"
                                        placeholder="Mô tả ..."
                                        v-model="post_content"
                                    ></textarea>
                                </div>
                            </form>
                            <div class="ass1-section__image">
                                <a
                                    @click.prevent="uploadImage"
                                    style="cursor: pointer"
                                >
                                    <img :src="renderImg" alt="default" />
                                </a>
                            </div>
                            <a
                                href="https://memeful.com/"
                                target="_blank"
                                class="ass1-btn ass1-btn-meme"
                            >
                                Chế ảnh từ meme
                            </a>
                            <a
                                @click.prevent="uploadImage"
                                class="ass1-btn ass1-btn-meme"
                                style="cursor: pointer"
                                >Đăng ảnh từ máy tính</a
                            >
                            <input
                                @change="handleUploadImage"
                                type="file"
                                name="images"
                                placeholder=""
                                class="form-control"
                                ref="imageUpload"
                                style="display: none"
                            />
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <aside class="ass1-aside ass1-aside__edit-post">
                        <div>
                            <button @click="handleUploadPost" class="ass1-btn">
                                Đăng bài
                            </button>
                        </div>
                        <div class="ass1-aside__edit-post-head">
                            <span
                                style="
                                    display: block;
                                    width: 100%;
                                    margin-bottom: 10px;
                                "
                                >Chọn danh mục</span
                            >
                            <label
                                class="ass1-checkbox"
                                v-for="item in listCate"
                                :key="item.id"
                            >
                                <input
                                    v-model="categories"
                                    :value="item.id"
                                    type="checkbox"
                                    name="state-post"
                                    checked="checked"
                                />
                                <span></span>
                                <p>{{ item.text }}</p>
                            </label>
                        </div>
                        <div class="ass1-aside__get-code">
                            <p>Share Link</p>
                        </div>
                        <div class="ass1-aside__social">
                            <a
                                href=""
                                class="ass1-btn-social__facebook ass1-btn-social"
                                ><i
                                    class="fa fa-facebook"
                                    aria-hidden="true"
                                ></i
                            ></a>
                            <a
                                href=""
                                class="ass1-btn-social__twitter ass1-btn-social"
                                ><i class="fa fa-twitter" aria-hidden="true"></i
                            ></a>
                            <a
                                href=""
                                class="ass1-btn-social__google ass1-btn-social"
                                ><i
                                    class="fa fa-google-plus"
                                    aria-hidden="true"
                                ></i
                            ></a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions } from "vuex";
import { checkImageURL, checkImageFile } from "../helpers";
import { errorNotify, successNotify } from "../plugins/notification";
export default {
    title: "Đăng bài viết",
    name: "post-upload",
    data() {
        return {
            post_content: "",
            categories: [],
            url_image: "",
            obj_image: {
                objFile: null,
                base64URL: "",
            },
        };
    },
    computed: {
        listCate() {
            return this.$store.state.modulePost.categories;
        },
        renderImg() {
            if (this.url_image && checkImageURL(this.url_image))
                return this.url_image;
            else if (this.obj_image.base64URL) return this.obj_image.base64URL;
            return "/dist/images/no_image_available.jpg";
        },
    },
    methods: {
        ...mapActions(["createPost"]),
        uploadImage() {
            this.$refs.imageUpload.click();
        },
		resetData(){
			this.post_content = '',
			this.categories = [],
			this.url_image = '',
			this.obj_image = {
                objFile: null,
                base64URL: "",
            }
		},
        handleUploadImage(e) {
            if (e.target.files && e.target.files.length > 0) {
                const imgUpload = e.target.files[0];

                let check = checkImageFile(imgUpload);

                if (!check) {
                    this.$notify(errorNotify("File ảnh không hợp lệ"));
                    return;
                }
                // đọc file ảnh
                let reader = new FileReader();
                reader.addEventListener(
                    "load",
                    () => {
                        let previewSrc = reader.result;
                        this.obj_image.base64URL = previewSrc;
                        this.obj_image.objFile = imgUpload;
                    },
                    false
                );

                if (imgUpload) {
                    reader.readAsDataURL(imgUpload);
                }
            }
        },
        handleUploadPost() {
            let { post_content, url_image, categories, obj_image } = this;

            if (post_content && categories.length) {
                if (url_image || obj_image.objFile) {
                    let data = {
                        post_content,
                        url_image,
                        category: categories,
                    };
                    if (obj_image.objFile) data.obj_image = obj_image.objFile;

                    this.createPost(data).then((res) => {
                        if(res.ok){
							this.resetData();
							this.$notify(successNotify("Upload bài viết mới thành công"));
						} else {
							 this.$notify(errorNotify(res.error));
						}
                    });
                } else {
                    this.$notify(errorNotify("Vui upload hình ảnh bài viết"));
                }
            } else {
                this.$notify(
                    errorNotify("Vui lòng nhập đầy đủ thông tin bài viết")
                );
            }
        },
    },
};
</script>

<style></style>
