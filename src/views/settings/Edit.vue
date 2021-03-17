<template>
  <div class="add-post">
    <h1>Edytuj ustawienia</h1>
    <el-form ref="settings" :model="settings" label-width="100px" class="add-post-form">
      <el-form-item
        label="Nazwa"
        prop="name"
      >
        <el-input v-model="settings.name" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item
        label="Wartość"
        prop="value"
      >
        <el-input v-model="settings.value" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Zapisz</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SettingResource from '@/api/setting';
const settingResource = new SettingResource();

export default {
  name: 'EditSettings',
  data() {
    return {
      settings: {},
    };
  },
  mounted() {
    this.getSetting();
  },
  methods: {
    async getSetting() {
      const settings = await settingResource.get(this.$route.query.id);
      if (settings.category === 'pricing') {
        settings.value = (settings.value / 100);
      }
      settings.name = this.$t('settings.names.' + settings.name)
      this.settings = {
        name: settings.name,
        value: settings.value,
      };
    },
    submitForm() {
      this.$refs.settings.validate(async(valid) => {
        if (!valid) {
          this.$notify({
            title: 'Error',
            message: 'Popraw formularz',
            type: 'error',
            duration: 2000,
          });
          return false;
        } else {
          await settingResource.update(this.$route.query.id, this.settings);
          await this.$router.push({ path: '/settings/list' });
        }
      });
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
