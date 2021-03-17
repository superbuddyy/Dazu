<template>
  <el-form-item label="Opis" prop="description">
    <vue-editor v-model="local_value" :editor-toolbar="customToolbar" />
  </el-form-item>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  name: 'Description',
  components: {
    VueEditor,
  },
  props: {
    value: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      local_value: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ],
    };
  },
  watch: {
    value(value) {
      if (value !== this.local_value) {
        this.local_value = this.value;
        this.$emit('set-value', value);
      }
    },
    local_value(value) {
      this.$emit('set-value', value);
    },
  },
};
</script>

<style scoped>

</style>
