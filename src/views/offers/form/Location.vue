<template>
  <div>
    <el-form-item label="Szerokość">
      <el-input v-model="location.lat" />
    </el-form-item>
    <el-form-item label="Długość">
      <el-input v-model="location.lat" />
    </el-form-item>
    <el-form-item label="Nazwa">
      <el-input v-model="location.location_name" />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'Location',
  props: {
    name: {
      type: String,
      default() {
        return '';
      },
    },
    slug: {
      type: String,
      default() {
        return '';
      },
    },
    value: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      location: {
        lat: 0,
        lon: 0,
        location_name: '',
      },
    };
  },
  watch: {
    value(value) {
      this.location.lat = this.value[0];
      this.location.lon = this.value[1];
      this.location.location_name = this.value[2];
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
