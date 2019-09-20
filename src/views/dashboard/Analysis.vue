<template>
  <div class="main-content">
    <div class="left-map">
      1111111111
    </div>
    <div class="right-info">
      <a-card style="100%" :tabList="planList" :activeTabKey="noTitleKey" @tabChange="key => onTabChange(key,'noTitleKey')">
        <div v-if="noTitleKey === 'addPlan'">
          <a-row type="flex" justify="center">
            <a-col :span="8">
              <a-button style="padding:0 22px;" @click="addRiverBtn">添加河道</a-button>
            </a-col>
            <a-col :span="8" :offset="3">
              <a-button>添加调查点</a-button>
            </a-col>
          </a-row>
          <div class="riverInfo">
            <div class="river_info">
              <span>黄浦江</span>
              <a-select defaultValue="" @change="handleChange" style="width:120px;margin-left:80px;">
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="disabled" disabled>Disabled</a-select-option>
              </a-select>
              <a-button shape="circle" icon="close" style="font-size:8px;margin-left:20px;"></a-button>
            </div>
            <!-- <a-tree chechable>

            </a-tree> -->
          </div>
        </div>
        <div v-if="noTitleKey === 'nowPlan'">今日计划</div>
      </a-card>
    </div>
    <add-river ref="addRiver"></add-river>
  </div>
</template>

<script>
import '../../assets/css/analysis.less'
import addRiver from '../modals/addRiver'

export default {
  name: 'Analysis',
  components:{
    addRiver
  },
  data() {
    return {
      planList:[{
        key:'addPlan',
        tab:'新建计划',
      },{
        key:'nowPlan',
        tab:'今日计划'
      }],
      noTitleKey:'addPlan'
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  methods:{
    onTabChange(key,type){
      console.log(key,type);
      this[type] = key
    },
    addRiverBtn(){
      this.$refs.addRiver.show()
    },
    handleChange(){

    }
  }
}
</script>
