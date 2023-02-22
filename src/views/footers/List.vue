<template>
  <div class="app-container">
    <h1>Lista wpisów</h1>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>
            <a :href="frontendUrl + '/footer/' + scope.row.slug" target="_blank">{{ scope.row.id }}</a>
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Nazwa">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Status">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 'active'">Aktywny</span>
          <span v-if="scope.row.status === 'in_active'">Nieaktywny</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Właściciel">
        <template slot-scope="scope">
          <span>{{ scope.row.user.email }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Dodano">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Zaktualizowano">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at }}</span>
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
import PostResource from '@/api/footer';
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission'; // Permission directive

const postResource = new PostResource();

export default {
  name: 'FootersList',
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
  computed: {
    frontendUrl() {
      return process.env.VUE_APP_FRONTEND_URL;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    edit(slug) {
      this.$router.push({ path: '/footers/edit-footer?footer=' + slug });
    },
    handleFilter() {
      this.query.page = 1;
      this.getList();
    },
    async getList() {
      this.loading = true;
      const { data, total } = await postResource.list(this.query);
      this.list = data;
      this.total = total;
      this.loading = false;
    },
    async deletePost(id) {
      this.loading = true;
      await postResource.destroy(id);
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
