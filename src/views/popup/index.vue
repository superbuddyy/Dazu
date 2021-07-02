<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID">
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
            v-if="scope.row.is_active"
            confirm-button-text="Tak"
            cancel-button-text="Nie"
            icon="el-icon-info"
            icon-color="red"
            title="Czy na pewno chcesz dezaktywaować popup?"
            @onConfirm="deactivate(scope.row.id)"
          >
            <el-button
              slot="reference"
              type="danger"
              size="small"
              icon="el-icon-delete"
            >
              Dezaktywuj
            </el-button>
          </el-popconfirm>
          <el-button
            v-if="scope.row.is_active === false"
            slot="reference"
            type="success"
            size="small"
            icon="el-icon-delete"
            @click="activate(scope.row.id)"
          >
            Aktywuj
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditPopupDialog
      :dialog-visible="insertDialog"
      :selected-popup="selectedPopup"
      @item-edited="itemEdited"
    />
  </div>
</template>

<script>
import PopupResource from '@/api/popup';
import EditPopupDialog from '@/views/popup/EditPopupDialog';
const popupResource = new PopupResource();

export default {
  name: 'PopupList',
  components: {
    EditPopupDialog,
  },
  data() {
    return {
      selectedFaqItem: {
        title: '',
        content: '',
      },
      list: null,
      insertDialog: false,
      selectedPopup: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      this.list = await popupResource.list(this.query);
      this.loading = false;
    },
    async activate(id) {
      this.loading = true;
      await popupResource.activate(id);
      this.list.forEach(function(item) {
        if (item.id === id) {
          item.is_active = true;
        }
      });
      this.loading = false;
    },
    async deactivate(id) {
      this.loading = true;
      await popupResource.deactivate(id);
      this.list.forEach(function(item) {
        if (item.id === id) {
          item.is_active = false;
        }
      });
      this.loading = false;
    },
    openInsertDialog() {
      this.insertDialog = true;
    },
    edit(item) {
      this.selectedPopup = item;
      this.openInsertDialog();
    },
    itemEdited(item) {
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
.popup-page {
  margin: 20px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .popup-item {
    margin: 10px;
    display: flex;
    align-items: center;

    b {
      margin-right: 4px;
    }
  }
}
</style>
