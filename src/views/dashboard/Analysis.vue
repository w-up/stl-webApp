<template>
  <div class="main-content">
    <div class="left-map">
      111111111
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
            
          </div>
        </div>
        <div v-if="noTitleKey === 'nowPlan'">今日计划</div>
      </a-card>
    </div>
    <add-river></add-river>
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
      
    }
  }
}
</script>
