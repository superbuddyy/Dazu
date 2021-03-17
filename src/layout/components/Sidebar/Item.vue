<template>
  <div>
    <i v-if="icon && icon.startsWith('el-')" :class="icon" />
    <svg-icon v-if="!icon || !icon.startsWith('el-')" :icon-class="icon" />
    <span v-if="title" slot="title">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
  .el-submenu [class^="el-icon-"] {
    text-align: left;
  }
</style>
