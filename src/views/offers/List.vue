<template>
  <div class="app-container">
    <h1>Oferty</h1>
    <div class="filter-container">
      <el-input v-model="query.search" style="width: 200px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ $t('table.search') }}
      </el-button>
    </div>

    <span>
        filter: 
      </span>
      <el-select
        v-model="current_agent"
        class="mr-5"
        filterable
        clearable
        placeholder="Wybierz tagi dla swojego artykułu"
        @change="searchOfferList()"
      >
        <el-option
          v-for="agent in agents"
          :key="agent.id"
          :label="agent.name"
          :value="agent.value"
        >
          {{ agent.name }}
        </el-option>
      </el-select>
      <span>
        sort: 
      </span>
      <el-select
        v-model="changeOrder"
        class="location-input"
        filterable
        placeholder="Wybierz opcje sortowania"
        clearable
        @change="changeOfferList"
      >
        <el-option
          v-for="loc in sortOptions"
          :key="loc.id"
          :label="loc.name"
          :value="loc.value"
        />
      </el-select>

    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%" :row-class-name="rowClass">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>
            <a :href="frontendUrl + '/ogloszenia/' + scope.row.slug" target="_blank">{{ scope.row.id }}</a>
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Nazwa">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Cena">
        <template slot-scope="scope">
          <span>{{ scope.row.price / 100 }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Status">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" @change="changeStatus(scope.row.slug, scope.row.status)">
            <el-option
              label="Nieaktywny"
              value="in_active"
            />
            <el-option
              label="Dezaktywowane przez użytkownika"
              value="in_active_by_user"
            />
            <el-option
              label="Aktywny"
              value="active"
            />
            <el-option
              label="Odrzucony"
              value="rejected"
            />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Package">
        <template slot-scope="scope">
          <el-select v-model="scope.row.subscription" value-key="scope.row.subscription" @change="changePackage(scope.row.slug, scope.row.subscription)">
            <el-option v-for="item in outlet" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
          <el-button v-permission="['manage offer']" type="warning" size="small" icon="el-icon-edit" @click="edit(scope.row.slug)">
            Edytuj
          </el-button>
          <el-button v-permission="['manage offer']" type="danger" size="small" icon="el-icon-delete">
            Usuń
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />
    <el-dialog
      title="Notatka"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="closeDialog"
    >
      <el-input v-model="form.note" type="textarea" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Anuluj</el-button>
        <el-button type="primary" @click="changeStatusWithNote()">Zapisz</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'; // Secondary package based on el-pagination
import OfferResource from '@/api/offer';
import waves from '@/directive/waves'; // Waves directive
import permission from '@/directive/permission'; // Permission directive

const offerResource = new OfferResource();

export default {
  name: 'OfferList',
  components: { Pagination },
  directives: { waves, permission },
  data() {
    return {
      changeOrder: 'DESC',
      current_agent: 'all',
      sortOptions: [
        {
          id: 1,
          name: 'Najnowsze',
          value: 'DESC'
        },
        {
          id: 2,
          name: 'Najstarsze',
          value: 'ASC'
        },
        {
          id: 3,
          name: 'Aktywne',
          value: 'update'
        },
      ],
      agents: [
        {
          id: 1,
          name: 'all',
          value: 'all'
        },
        {
          id: 2,
          name: 'active',
          value: 'active'

        },
        {
          id: 3,
          name: 'deactivated',
          value: 'deactivated'

        },
        {
          id: 4,
          name: 'inactive',
          value: 'inactive'

        },
        {
          id: 5,
          name: 'rejected',
          value: 'rejected'

        },
      ],
      dialogVisible: false,
      form: {
        note: '',
        slug: '',
        status: '',
      },
      packages:{
        1:'Darmowe',
        2:'Standard',
        3:'Silver',
        4:'Gold'
      },
      outlet: [
        { value: 1, label: 'Darmowe', slug: 1 },
        { value: 2, label: 'Standard', slug: 2 },
        { value: 3, label: 'Silver', slug: 3 },
        { value: 4, label: 'Gold', slug: 4 },
      ],
      query: {
        page: 1,
        limit: 15,
        order: 'DESC',
        order_by: 'created_at',
        filterUI: 'all'
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
    changeOfferList () {
      if(this.changeOrder == 'update'){
        this.query.order = 'DESC'
        this.query.order_by = 'updated_at'
      }else{
        this.query.order = this.changeOrder
        this.query.order_by = 'created_at'
      }
      this.getList()
    },
    searchOfferList () {
      // if (this.searchTxt) {
      //   this.query.keyword = this.searchTxt
      // }
      // if (this.changeOrder) {
      //   this.query.sort = this.changeOrder
      // }
      if (this.current_agent) {
        this.query.filterUI = this.current_agent
      }
      this.getList()
    },
    rowClass({ row, rowIndex }) {
      if (row.visible_from_date !== null && row.status === 'active') {
        return 'warning-row';
      }
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    edit(slug) {
      this.$router.push({ path: '/offers/edit?slug=' + slug });
    },
    handleFilter() {
      this.query.page = 1;
      this.getList();
    },
    async getList() {
      this.loading = true;
      const { data, total } = await offerResource.list(this.query);
      this.list = data;
      this.total = total;
      this.loading = false;
    },
    async changeStatusWithNote() {
      await offerResource.changeStatus(this.form.slug, this.form.status, this.form.note);
      this.dialogVisible = false;
      this.$notify({
        title: 'Sukces',
        message: 'Status ogłoszenia został zmieniony',
        type: 'success',
      });
    },
    async changeStatus(slug, status) {
      if (status === 'rejected') {
        this.dialogVisible = true;
        this.form.status = status;
        this.form.slug = slug;
        return;
      }
      await offerResource.changeStatus(slug, status, null);
      this.$notify({
        title: 'Sukces',
        message: 'Status ogłoszenia został zmieniony',
        type: 'success',
      });
    },
    async changePackage(slug, status) {
      await offerResource.changePackage(slug, status, null);
      this.$notify({
        title: 'Sukces',
        message: 'Pakiet został zmieniony',
        type: 'success',
      });
    },
    async deleteRecord(slug) {
      console.log(slug)
      await offerResource.destroy(slug);
      this.getList();
    },
    deleteCancel () {
      console.log('delete cancel')
    }
  },
};
</script>

<style lang="scss">
.el-table .warning-row {
  background: oldlace;
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
