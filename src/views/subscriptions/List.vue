<template>
  <div class="app-container">
    <h1>Lista subskrybcji</h1>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Nazwa">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Cena">
        <template slot-scope="scope">
          <span>{{ (scope.row.price / 100).toFixed(2) }} pln</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Czas trwania">
        <template slot-scope="scope">
          <span>{{ scope.row.duration / 24 }} dni</span>
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
import SubscriptionResource from '@/api/subscription';
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission'; // Permission directive

const subscriptionResource = new SubscriptionResource();

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
      this.$router.push({ path: '/subscriptions/edit?id=' + slug });
    },
    async getList() {
      this.loading = true;
      this.list = await subscriptionResource.list(this.query);
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
