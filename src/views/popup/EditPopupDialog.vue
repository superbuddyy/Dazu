<template>
  <el-dialog
    title="Edytuj popup"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose"
  >
    <b>Tytuł</b>
    <el-input v-model="local_title" placeholder="Pokaż ponownie za (dni)" />
    <b>Opis</b>
    <vue-editor v-model="local_content" :editor-toolbar="customToolbar" />
    <b>Pokaż ponowanie za ... (dni)</b>
    <el-input v-model="local_show_again_after" placeholder="Pokaż ponownie za (dni)" />
    <el-upload
      action="#"
      :show-file-list="true"
      list-type="picture-card"
      accept="image/jpeg,image/png"
      :limit="1"
      :multiple="true"
      :on-change="handleChange"
      :auto-upload="false"
      :file-list="localFileList"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <span class="el-upload-list__item-actions">
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="removeImage(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>

    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">Zamknij</el-button>
      <el-button type="primary" @click="edit">Zapisz</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import PopupResource from '@/api/popup';
const popupResource = new PopupResource();

export default {
  name: 'EditPopupDialog',
  components: {
    VueEditor,
  },
  props: {
    selectedPopup: {
      type: Object,
      default() {
        return {
          id: null,
          title: null,
          show_again_after: null,
          content: null,
          image: null,
        };
      },
    },
    dialogVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data: () => {
    return {
      local_show_again_after: '',
      local_id: null,
      local_title: '',
      local_content: '',
      local_image: '',
      localFileList: [],
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    };
  },
  watch: {
    async selectedPopup(value) {
      this.local_id = value.id;
      this.local_title = value.title;
      this.local_content = value.content;
      this.local_show_again_after = value.showAgainAfter;
      this.local_image = await this.urlToObject('/storage/' + value.image.path_name);
      this.localFileList[0] = await this.local_image;
    },
  },
  methods: {
    async urlToObject(imageUrl) {
      const response = await window.axios({
        method: 'get',
        url: imageUrl,
        responseType: 'blob',
      });

      return {
        raw: new File([response.data], 1 + '-image.jpg', { type: response.data.type, url: imageUrl }),
        url: imageUrl,
      };
    },
    removeImage(index) {
      this.localFileList.splice(index, 1);
      this.$emit('on-change', this.localFileList);
    },
    handleChange(file) {
      this.local_image = file;
      this.localFileList.push(file);
    },
    handleClose() {
      this.$emit('close', false);
    },
    async edit() {
      const formData = new FormData();
      formData.append('title', this.local_title);
      formData.append('content', this.local_content);
      formData.append('show_again_after', this.local_show_again_after);
      if (this.local_image) {
        formData.append('image', this.local_image.raw);
      }

      const result = await popupResource.edit(this.local_id, formData);
      this.selectedPopup = {};
      this.$emit('item-edited', result);
    },
  },
};
</script>

<style scoped>
  .title {
    margin-bottom: 10px;
  }
  .img-box {
    display: flex;
  }
  img {
    width: 200px;
    height: auto;
  }
  .el-input {
    margin: 10px 0;
  }
</style>
