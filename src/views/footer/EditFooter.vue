<template>
  <div class="add-post">
    <h1>Edytuj wpisy</h1>
    <el-form ref="post" :model="post" label-width="100px" class="add-post-form">
      <el-form-item
        label="Tytuł"
        prop="title"
        :rules="[
          { required: true, message: 'Tytuł jest wymagany'},
        ]"
      >
        <el-input v-model="post.title" type="title" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Status"
      >
        <el-select v-model="post.status">
          <el-option
            label="Nieaktywny"
            value="in_active"
          />
          <el-option
            label="Aktywny"
            value="active"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Zdjęcie"
        prop="url"
      >
        
        <el-input v-model="post.name" type="name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Treść"
        prop="content"
        :rules="[
          { required: true, message: 'Treść jest wymagana'},
        ]"
      >
        <vue-editor v-model="post.content" :editor-toolbar="customToolbar" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Zapisz</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import FooterResource from '@/api/footer';
const footerResource = new FooterResource();
export default {
  name: 'EditFooter',
  components: {
    VueEditor,
  },
  data() {
    return {
      activePhotoPreview: true,
      post: {},
      fileList: [],
      previewDialogVisible: false,
      previewDialogUrl: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    async getPost() {
      this.post = await footerResource.get(this.$route.query.post);
    },
    submitForm() {
      this.$refs.post.validate(async(valid) => {
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
          formData.append('title', this.post.title);
          formData.append('content', this.post.content);
          formData.append('name', this.post.name);
          
          await footerResource.update(this.$route.query.post, formData);
          await this.$router.push({ path: '/footer/footers-list' });
        }
      });
    },
    handlePreview(file) {
      this.previewDialogUrl = file.url;
      this.previewDialogVisible = true;
    },
    handleChangeImages(file) {
      this.activePhotoPreview = false;
      this.post.image = file.raw;
    },
    async handleRemove() {
      this.post.image = null;
    },
  },
};
</script>

<style lang="scss" scoped>
  .add-post {
    margin: 0 30px;
    .add-post-form {
      //width: 50%;
      .post-photo {
        height: 140px;
      }
    }
  }
</style>
