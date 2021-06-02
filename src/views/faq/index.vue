<template>
  <div class="app-container">
    <h1>
      FAQ
    </h1>
    <div class="add">
      <el-button type="primary" @click="openInsertDialog">Dodaj</el-button>
    </div>
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="Pytanie">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Akcja" width="350">
        <template slot-scope="scope">
          <el-button type="warning" size="small" icon="el-icon-edit" @click="edit(scope.row)">
            Edytuj
          </el-button>
          <el-popconfirm
            confirm-button-text="Tak"
            cancel-button-text="Nie"
            icon="el-icon-info"
            icon-color="red"
            title="Czy na pewno chcesz usunąć pytanie?"
            @onConfirm="deleteItem(scope.row.id)"
          >
            <el-button slot="reference" type="danger" size="small" icon="el-icon-delete">
              Delete
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <AddFaqDialog
      :dialog-visible="insertDialog"
      :selected-faq-item="selectedFaqItem"
      @item-added="addItem"
      @item-edited="editItem"
      @close="insertDialog = false"
    />
  </div>
</template>

<script>
import FaqResource from '@/api/faq';
import AddFaqDialog from '@/views/faq/AddFaqDialog';
const faqResource = new FaqResource();

export default {
  name: 'FaqList',
  components: {
    AddFaqDialog,
  },
  data() {
    return {
      selectedFaqItem: {
        title: '',
        content: '',
      },
      list: null,
      insertDialog: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      this.list = await faqResource.list(this.query);
      this.loading = false;
    },
    async deleteItem(id) {
      this.loading = true;
      await faqResource.destroy(id);
      this.list = this.list.filter(function(item) {
        return item.id !== id;
      });
      this.loading = false;
    },
    openInsertDialog() {
      this.insertDialog = true;
    },
    edit(item) {
      this.selectedFaqItem = item;
      this.openInsertDialog();
    },
    addItem(item) {
      this.insertDialog = false;
      this.list.append(item);
    },
    editItem(item) {
      this.insertDialog = false;
      const index = this.list.findIndex((i) => {
        return i.id === item.id;
      });
      this.list.splice(index, 1);
      this.list.unshift(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.faq-page {
  margin: 20px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .faq-item {
    margin: 10px;
    display: flex;
    align-items: center;

    b {
      margin-right: 4px;
    }
  }
}
</style>
