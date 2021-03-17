<template>
  <div class="app-container">
    <h1>Newsletter</h1>
    <div class="add-offer-form">
      <el-form
        v-if="!loading"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        @submit.prevent="onSubmit"
      >
        <el-form-item label="Tytuł" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <Description
          :value="form.content"
          @set-value="form.content = $event"
        />

      </el-form>
      <el-button type="primary" style="float: right" @click="send">Wyślij</el-button>
    </div>
  </div>
</template>

<script>
import NewsletterResource from '@/api/newsletter';
import Description from '@/views/offers/form/Description';
import permission from '@/directive/permission'; // Permission directive

const newsletterResource = new NewsletterResource();

export default {
  name: 'NewsletterForm',
  components: {
    Description,
  },
  directives: { permission },
  data() {
    return {
      loading: false,
      newsletters: [],
      form: {
        title: '',
        content: '',
      },
      rules: {
        category: { required: true, message: 'Kategoria jest wymagana', trigger: 'change' },
      },
    };
  },
  methods: {
    async send() {
      await newsletterResource.store(this.form);
      this.$notify({
        title: 'Sukces',
        message: 'Wysłano newsletter',
        type: 'success',
        duration: 2000,
      });
      this.form = {
        title: '',
        content: '',
      };
      await this.$router.push({ path: '/newsletter/newsletter' });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  flex: 1;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 80%;
  .block {
    float: left;
    min-width: 250px;
  }
  .clear-left {
    clear: left;
  }
}
</style>
