<template>
  <div class="main-content">
    <div class="left-info">
      <img src="../../assets/map.jpg" style="width:100%;height: calc(100vh - 66px);">
      <div class="left-date">
        <a-date-picker @change="selectData" />
      </div>
      <div class="left-weather">
        <img src="../../assets/weather.png" style="width:240px;height:38px;">
      </div>
      <div class="left-patrol">
        <p class="left-patrol-title">推荐巡河方案</p>
        <div class="patrol-plan">
          <a-tree checkable v-model="checkedPlan" @select="selectPatrol" :treeData="patrolPlanInfo"/>
        </div>
      </div>
      <search-river ref="selectPatrol" class="riverSearchModal"></search-river>
    </div>
    <div class="right-info">
      <a-card style="position:relative;height:100%;overflow-y: auto;" :tabList="planList" :activeTabKey="noTitleKey" @tabChange="key => onTabChange(key,'noTitleKey')">
        <div v-if="noTitleKey === 'addPlan'">
          <div v-if="ishidden == 1">
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
                <a-select defaultValue="" @change="handleChange" style="width:180px;margin-left:20px;">
                  <a-select-option value="jack">Jack</a-select-option>
                  <a-select-option value="lucy">Lucy</a-select-option>
                  <a-select-option value="disabled" disabled>Disabled</a-select-option>
                </a-select>
                <a-button shape="circle" icon="close" style="font-size:8px;margin-left:15px;"></a-button>
              </div>
              <a-tree checkable @expand="onExpand" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent"
                  v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData">
              </a-tree>
              <a-button class="addTask_btn" @click="addTaskBtn" @addPlanInfo="clearBtn">追加任务</a-button> 
              <add-task ref="addTask"></add-task>
            </div>
            <div class="riverInfo">
              <div class="river_info">
                <span>专向调查点</span>
                <a-button shape="circle" icon="close" style="font-size:8px;margin-left:185px;"></a-button>
              </div>
              <a-tree checkable @expand="onExpand" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent"
                  v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData">
              </a-tree>
              <a-button class="addTask_btn">追加任务</a-button>
            </div>
            <div class="addPlan_foot">
              <span @click="newPlan_btn">生成计划</span>
              <span>加入已有计划</span>
            </div>
          </div>
          <div v-if="ishidden == 2">
            <creat-group ref="creatGroup"></creat-group>
          </div>
          <!-- <div v-if="ishidden == $refs.creatGroup.nextBtn()">
            新建计划
          </div> -->
        </div>
        <div v-if="noTitleKey === 'nowPlan'">今日计划</div>
      </a-card>
    </div>
  </div>
</template>

<script>
import '../../assets/css/analysis.less'
import searchRiver from '../modals/searchRiver'
import addTask from '../modals/addTask'
import creatGroup from '../modals/creatGroup'

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' }
        ]
      },
      {
        title: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' }
    ]
  },
  {
    title: '0-2',
    key: '0-2'
  }
]
export default {
  name: 'Analysis',
  components: {
    searchRiver,
    addTask,
    creatGroup
  },
  data() {
    return {
      planList: [
        {
          key: 'addPlan',
          tab: '新建计划'
        },
        {
          key: 'nowPlan',
          tab: '今日计划'
        }
      ],
      noTitleKey: 'addPlan',
      expandedKeys: [],
      autoExpandParent: false,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      treeData,
      ishidden: 1,
      checkedPlan:[],
      cBtn:true,
      patrolPlanInfo: [
        {
          title: '黄浦江',
          key: '1',
          children: [
            { title: '当前河道方位内出现红色风险源,推荐加入巡查计划', key: '1' },
            { title: '当前河道方位内出现红色风险源,推荐加入巡查计划', key: '2' }
          ]
        },
        {
          title: '鸭绿江',
          key: '2',
          children: [
            {
              title: '当前河道预设任务完成度滞后！其中360未完成3个、正射影像线路：A1+B2+C3未执行，推荐加入调查计划',
              key: '2'
            },
            {
              title: '当前河道预设任务完成度滞后！其中360未完成3个、正射影像线路：A1+B2+C3未执行，推荐加入调查计划',
              key: '1'
            }
          ]
        }
      ]
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    //选中添加河道或今日计划面板
    onTabChange(key, type) {
      console.log(key, type)
      this[type] = key
    },
    //选中添加河道
    addRiverBtn() {
      this.$refs.selectPatrol.show()
    },
    //右侧模块选择框修改
    handleChange() {},
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    //河道计划选择
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    //日期选择
    selectData(date, dateString) {
      console.log(data, dateString)
    },
    //选中巡河方案
    selectPatrol() {},
    addTaskBtn() {
      this.$refs.addTask.show();
      this.cBtn = false;
    },
    clearBtn(val) {
      this.cBtn = val
    },
    //生成计划
    newPlan_btn() {
      this.ishidden = 2
    }
  }
}
</script>
