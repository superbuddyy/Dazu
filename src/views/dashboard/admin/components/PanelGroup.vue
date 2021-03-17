<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-user"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Użytkownicy
          </div>
          <count-to :start-val="0" :end-val="stats.users" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-folder-checked"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Aktywne ogłoszenia
          </div>
          <count-to :start-val="0" :end-val="stats.active_offers" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-folder"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Wszystkie ogłoszenia
          </div>
          <count-to :start-val="0" :end-val="stats.all_offers" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="el-icon-sold-out"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Zakupione pakiety
          </div>
          <count-to :start-val="0" :end-val="stats.subscriptions" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to';
import StatResource from '@/api/stat';

const statResource = new StatResource();

export default {
  components: {
    CountTo,
  },
  data() {
    return {
      stats: [],
    };
  },
  mounted() {
    this.getStats();
  },
  methods: {
    async getStats() {
      this.stats = await statResource.statsGeneral();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
      font-size: 48px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 10px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
