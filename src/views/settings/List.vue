<template>
  <div class="app-container">
    <h1>Lista Ustawień</h1>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Nazwa">
        <template slot-scope="scope">
          <span>{{ $t('settings.names.' + scope.row.name) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Wartość">
        <template slot-scope="scope">
          <span v-if="scope.row.category === 'pricing'">{{ (scope.row.value / 100).toFixed(2) }} pln</span>
          <span v-if="scope.row.category !== 'pricing'">{{ scope.row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Kategoria">
        <template slot-scope="scope">
          <span>{{ $t('settings.category.' + scope.row.category) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Akcja" width="350">
        <template slot-scope="scope">
          <el-button type="warning" size="small" icon="el-icon-edit" @click="edit(scope.row.id)">
            Edytuj
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SettingResource from '@/api/setting';
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission'; // Permission directive

const settingResource = new SettingResource();

export default {
  name: 'SubscriptionsList',
  directives: { waves, permission },
  data() {
    return {
      total: 1,
      query: {},
      list: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    edit(slug) {
      this.$router.push({ path: '/settings/edit?id=' + slug });
    },
    async getList() {
      this.loading = true;
      this.list = await settingResource.list(this.query);
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.dialog-footer {
  text-align: left;
  padding-top: 0;
  margin-left: 150px;
}
.app-container {
  flex: 1;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .block {
    float: left;
    min-width: 250px;
  }
  .clear-left {
    clear: left;
  }
}
</style>
