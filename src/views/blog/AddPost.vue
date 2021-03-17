<template>
  <div class="add-post">
    <h1>Dodaj wpisy</h1>
    <el-form ref="addPost" :model="addPost" label-width="100px" class="add-post-form">
      <el-form-item
        label="Tytuł"
        prop="title"
        :rules="[
          { required: true, message: 'Tytuł jest wymagany'},
        ]"
      >
        <el-input v-model="addPost.title" type="title" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Zdjęcie"
        prop="image"
        :rules="[
          { required: true, message: 'Zdjęcie jest wymagane'},
        ]"
      >
        <el-upload
          class="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChangeImages"
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">Dodaj zdjęcie</el-button>
          <div slot="tip" class="el-upload__tip">jpg/png zdjęcia nie większe niż 500kb</div>
        </el-upload>
        <el-dialog :visible.sync="previewDialogVisible">
          <img width="100%" :src="previewDialogUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item
        label="Treść"
        prop="content"
        :rules="[
          { required: true, message: 'Treść jest wymagana'},
        ]"
      >
        <vue-editor v-model="addPost.content" :editor-toolbar="customToolbar" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Zapisz</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import PostResource from '@/api/post';
const postResource = new PostResource();
export default {
  name: 'AddPost',
  components: {
    VueEditor,
  },
  data() {
    return {
      addPost: {},
      fileList: [],
      previewDialogVisible: false,
      previewDialogUrl: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    };
  },
  methods: {
    submitForm() {
      this.$refs.addPost.validate(async(valid) => {
        if (!valid) {
          this.$notify({
            title: 'Error',
            message: 'Popraw formularz',
            type: 'error',
            duration: 2000,
          });
          return false;
        } else {
          const formData = new FormData();
          formData.append('title', this.addPost.title);
          formData.append('content', this.addPost.content);
          formData.append('main_photo', this.addPost.image);
          await postResource.store(formData);
          this.addPost = {};
          await this.$router.push({ path: '/blog/posts-list' });
        }
      });
    },
    handlePreview(file) {
      this.previewDialogUrl = file.url;
      this.previewDialogVisible = true;
    },
    handleChangeImages(file) {
      this.addPost.image = file.raw;
    },
    async handleRemove() {
      this.addPost.image = null;
    },
  },
};
</script>

<style lang="scss" scoped>
  .add-post {
    margin: 0 30px;
    .add-post-form {
      //width: 50%;
    }
  }
</style>
