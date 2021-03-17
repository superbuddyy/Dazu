<template>
  <div class="add-post">
    <h1>Edytuj użytkownika</h1>
    <el-form ref="user" :model="user" label-width="100px" class="add-post-form">
      <el-form-item
        label="Imię"
        prop="name"
        :rules="[
          { required: true, message: 'Imię jest wymagane'},
        ]"
      >
        <el-input v-model="user.name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Email"
        prop="email"
        :rules="[
          { required: true, message: 'Email jest wymagany'},
        ]"
      >
        <el-input v-model="user.email" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Telefon"
        prop="phone"
      >
        <el-input v-model="user.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Miasto"
        prop="city"
      >
        <el-input v-model="user.address.city" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Ulica"
        prop="street"
      >
        <el-input v-model="user.address.street" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Kod pocztowy"
        prop="zip_code"
      >
        <el-input v-model="user.address.zip_code" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Państwo"
        prop="country"
      >
        <el-input v-model="user.address.country" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="NIP"
        prop="nip"
      >
        <el-input v-model="user.nip" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Adres email zweryfikowany"
        prop="email_verified"
      >
        <el-checkbox v-model="user.email_verified" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Zapisz</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UserResource from '@/api/user';
const userResource = new UserResource();
export default {
  name: 'EditUser',
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    async getPost() {
      this.user = await userResource.get(this.$route.query.id);
    },
    submitForm() {
      this.$refs.user.validate(async(valid) => {
        if (!valid) {
          this.$notify({
            title: 'Error',
            message: 'Popraw formularz',
            type: 'error',
            duration: 2000,
          });
          return false;
        } else {
          console.log(this.user)
          await userResource.update(this.$route.query.id, this.user);
          await this.$router.push({ path: '/administrator/users' });
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
