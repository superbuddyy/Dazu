<template>
  <div class="app-container">
    <h1>Footers</h1>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Tytuł">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Content">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Akcja" width="350">
        <template slot-scope="scope">
          <el-button v-permission="['manage user']" type="warning" size="small" icon="el-icon-edit" @click="edit(scope.row.slug)">
            Edytuj
          </el-button>
          <el-popconfirm
            confirm-button-text="Tak"
            cancel-button-text="Nie"
            icon="el-icon-info"
            icon-color="red"
            title="Czy na pewno chcesz usunąć post?"
            @onConfirm="deletePost(scope.row.id)"
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
import FooterResource from '@/api/footer';
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission'; // Permission directive

const footerResource = new FooterResource();

export default {
  name: 'FooterList',
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      total: 1,
      query: {
        page: 1,
        limit: 15,
      },
      list: null,
    };
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
      const { data, total } = await footerResource.list(this.query);
      this.list = data;
      this.total = total;
      this.loading = false;
    },
    async deletePost(id) {
      this.loading = true;
      await footerResource.destroy(id);
      this.list = this.list.filter(function(post) {
        return post.id !== id;
      });
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
