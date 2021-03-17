<template>
  <el-form-item label="" prop="publish_date">
    Chcesz aby ogłoszenie pojawiło się w innym terminie?
    <el-date-picker
      v-model="value"
      type="date"
      placeholder="Wybierz datę"
      format="yyyy/MM/dd"
      value-format="yyyy-MM-dd"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'PublishDate',
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
    };
  },
  watch: {
    value(value) {
      this.local_value = this.value;
      this.$emit('set-value', value);
    },
  },
  methods: {
    //
  },
};
</script>

<style scoped>

</style>
