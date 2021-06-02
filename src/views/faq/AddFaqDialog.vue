<template>
  <el-dialog
    title="Dodaj pytanie do FAQ"
    :visible.sync="dialogVisible"
    width="80%"
    :before-close="handleClose"
  >
    <el-input v-model="local_title" placeholder="Pytanie" class="title" />
    <vue-editor v-model="local_content" :editor-toolbar="customToolbar" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">Zamknij</el-button>
      <el-button type="primary" @click="add">Zapisz</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import FaqResource from '@/api/faq';
const faqResource = new FaqResource();

export default {
  name: 'AddFaqDialog',
  components: {
    VueEditor,
  },
  props: {
    selectedFaqItem: {
      type: Object,
      default() {
        return {
          id: null,
          title: null,
          content: null,
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
  watch: {
    selectedFaqItem(value) {
      this.local_id = value.id;
      this.local_title = value.title;
      this.local_content = value.content;
    },
  },
  data: () => {
    return {
      local_id: null,
      local_title: '',
      local_content: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    };
  },
  methods: {
    handleClose() {
      this.$emit('close', false);
    },
    async add() {
      // Its store or update
      const result = await faqResource.store({
        id: this.local_id,
        title: this.local_title,
        content: this.local_content,
      });
      if (this.local_id === null) {
        this.$emit('item-added', result);
      }
      this.$emit('item-edited', result);
    },
  },
};
</script>

<style scoped>
  .title {
    margin-bottom: 10px;
  }
</style>
