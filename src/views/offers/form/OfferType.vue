<template>
  <el-form-item label="Typ Ogłoszenia">
    <el-button type="plain" :class="[ type === 'sprzedaz' ? 'active' : '' ]" @click="setType('sprzedaz')">
      Sprzedam
    </el-button>
    <el-button type="plain" :class="[ type === 'wynajem' ? 'active' : '' ]" @click="setType('wynajem')">
      Wynajmę
    </el-button>
    <el-button type="plain" :class="[ type === 'zamienie' ? 'active' : '' ]" @click="setType('zamienie')">
      Zamienię
    </el-button>
    <el-button type="plain" :class="[ type === 'oddam' ? 'active' : '' ]" @click="setType('oddam')">
      Oddam
    </el-button>
  </el-form-item>
</template>

<script>
export default {
  name: 'OfferType',
  props: {
    type: {
      type: String,
      default() {
        return 'sprzedaz';
      },
    },
  },
  methods: {
    setType(type) {
      this.$emit('set-type', type);
    },
  },
};
</script>

<style scoped>
  .active {
    color: #1890ff;
    border-color: #badeff;
    background-color: #e8f4ff;
  }
</style>
