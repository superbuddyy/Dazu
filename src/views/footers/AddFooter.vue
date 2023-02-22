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
        label="name"
        prop="url"
        :rules="[
          { required: true, message: 'nazwa jest wymagane'},
        ]"
      >
        <el-input v-model="addPost.name" type="name" autocomplete="off" />
        
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
      <el-form-item id="controlbuttons">
        <el-button type="danger" @click="cancelForm()">Anulować</el-button>
        <el-button type="primary" @click="submitForm()">Dodać</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import PostResource from '@/api/footer';
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
          formData.append('name', this.addPost.name);
          await postResource.store(formData);
          this.addPost = {};
          await this.$router.push({ path: '/footers/footers-list' });
        }
      });
    },
    cancelForm() {
      this.$router.push({ path: '/footers/footers-list' });
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
  #controlbuttons{
    display: flex;
    justify-content: space-between;
  }
</style>
