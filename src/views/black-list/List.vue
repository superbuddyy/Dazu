<template>
  <div class="app-container">
    <h1>Lista słów zakazanych</h1>
    <div class="add">
      <el-input v-model="word" />
      <el-button type="primary" @click="addWord">Dodaj</el-button>
    </div>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Słowo">
        <template slot-scope="scope">
          <span>{{ scope.row.word }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Akcja" width="350">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="Tak"
            cancel-button-text="Nie"
            icon="el-icon-info"
            icon-color="red"
            title="Czy na pewno chcesz usunąć słowo?"
            @onConfirm="deleteWord(scope.row.id)"
          >
            <el-button slot="reference" v-permission="['manage user']" type="danger" size="small" icon="el-icon-delete">
              Delete
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import BlackListResource from '@/api/black-list';
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission'; // Permission directive

const blackListResource = new BlackListResource();

export default {
  name: 'BlackList',
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      word: '',
      total: 1,
      query: {
        page: 1,
        limit: 15,
      },
      list: null,
    };
  },
  computed: {
    frontendUrl() {
      return process.env.VUE_APP_FRONTEND_URL;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    handleFilter() {
      this.query.page = 1;
      this.getList();
    },
    async getList() {
      this.loading = true;
      const { data, total } = await blackListResource.list(this.query);
      this.list = data;
      this.total = total;
      this.loading = false;
    },
    async deleteWord(id) {
      this.loading = true;
      await blackListResource.destroy(id);
      this.list = this.list.filter(function(post) {
        return post.id !== id;
      });
      this.loading = false;
    },
    async addWord() {
      this.loading = true;
      const result = await blackListResource.store({ word: this.word });
      this.list.push(result);
      this.word = '';
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  display: flex;
  width: 400px;
  margin-bottom: 20px;
}
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
