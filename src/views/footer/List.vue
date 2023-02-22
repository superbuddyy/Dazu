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
      <el-table-column align="center" label="" width="350">
        <template slot-scope="scope">
          <el-button v-permission="['manage user']" type="warning" size="small" icon="el-icon-edit" @click="edit(scope.row.id)">
            Edytuj
          </el-button>
          
          <el-button v-if="!scope.row.roles.includes('admin')" v-permission="['manage user']" type="danger" size="small" icon="el-icon-delete" @click="handleDelete(scope.row.id);">
            Usuń
          </el-button>
         
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
    handleDelete(id) {
      this.$confirm('Czy na pewno chcesz usunąć użytkownika: ' + id + '?', 'Uwaga!', {
        confirmButtonText: 'Tak',
        cancelButtonText: 'Anuluj',
        type: 'warning',
      }).then(() => {
        footerResource.destroy(id).then(response => {
          this.$message({
            type: 'success',
            message: 'Poprawnie usunięto użytkownika',
          });
          this.handleFilter();
        }).catch(error => {
          console.log(error);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Usuwanie anulowane',
        });
      });
    },
    edit(id) {
      this.$router.push({ path: '/footer/edit-footer?post=' + id });
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
