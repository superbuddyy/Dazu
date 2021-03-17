<template>
  <div class="add-post">
    <h1>Edytuj subskrybcje</h1>
    <el-form ref="subscription" :model="subscription" label-width="100px" class="add-post-form">
      <el-form-item
        label="Nazwa"
        prop="name"
        :rules="[
          { required: true, message: 'Nazwa jest wymagana'},
        ]"
      >
        <el-input v-model="subscription.name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Treść"
        prop="description"
        :rules="[
          { required: true, message: 'Treść jest wymagana'},
        ]"
      >
        <el-input v-model="subscription.description" type="textarea" />
      </el-form-item>
      <el-form-item
        label="Cena"
        prop="price"
        :rules="[
          { required: true, message: 'Cena jest wymagana'},
        ]"
      >
        <el-input v-model="subscription.price" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Czas trwania"
        prop="duration"
        :rules="[
          { required: true, message: 'Czas trwania jest wymagany'},
        ]"
      >
        <el-input v-model="subscription.duration" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Ilosć darmowych odświeżeń"
        prop="number_of_raises"
        :rules="[
          { required: true, message: 'Ilosć darmowych odświeżeń jest wymagana'},
        ]"
      >
        <el-input v-model="subscription.number_of_refreshes" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Cena odświeżenia"
        prop="refresh_price"
        :rules="[
          { required: true, message: 'Cena odświeżenia jest wymagana'},
        ]"
      >
        <el-input v-model="subscription.refresh_price" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Ilosć darmowych podbić"
        prop="number_of_raises"
        :rules="[
          { required: true, message: 'Ilosć darmowych podbić jest wymagana'},
        ]"
      >
        <el-input v-model="subscription.number_of_raises" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="Cena podbicia"
        prop="raise_price"
        :rules="[
          { required: true, message: 'Cena podbicia jest wymagana'},
        ]"
      >
        <el-input v-model="subscription.raise_price" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Zapisz</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SubscriptionResource from '@/api/subscription';
const subscriptionResource = new SubscriptionResource();

export default {
  name: 'EditSubscription',
  data() {
    return {
      activePhotoPreview: true,
      subscription: {},
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
    this.getSubscription();
  },
  methods: {
    async getSubscription() {
      const subscription = await subscriptionResource.get(this.$route.query.id);
      this.subscription = {
        name: subscription.name,
        description: subscription.description,
        price: subscription.price / 100,
        duration: subscription.duration,
        number_of_refreshes: subscription.number_of_refreshes,
        refresh_price: subscription.refresh_price / 100,
        number_of_raises: subscription.number_of_raises,
        raise_price: subscription.raise_price / 100,
      };
    },
    submitForm() {
      this.$refs.subscription.validate(async(valid) => {
        if (!valid) {
          this.$notify({
            title: 'Error',
            message: 'Popraw formularz',
            type: 'error',
            duration: 2000,
          });
          return false;
        } else {
          await subscriptionResource.update(this.$route.query.id, this.subscription);
          await this.$router.push({ path: '/subscriptions/list' });
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
