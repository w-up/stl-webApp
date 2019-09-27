<template>
  <div style="width:100%;height:calc(100vh - 64px);">
    <split-pane :min-percent='25' :default-percent='81.5' split="vertical">
      <template slot="paneL">
        <div class="left-info">
          <!-- <img src="../../assets/map.jpg" style="width:100%;height: calc(100vh - 66px);"> -->
          <div id="map" ref="worldMap"></div>
          <div class="leftShow" v-if="noTitleKey === 'addPlan' || nosuperKey === 'taskCard'">
            <div class="left-date">
              <a-date-picker @change="selectData" />
            </div>
            <div class="left-weather">
              <img src="../../assets/weather.png" style="width:240px;height:38px;">
            </div>
            <!-- 新建计划时展示 -->
            <div class="left-patrol" v-if="noTitleKey === 'addPlan' || nosuperKey === 'taskCard'">
              <p class="left-patrol-title">推荐巡河方案</p>
              <div class="patrol-plan">
                <!-- <a-tree defaultExpandAll v-model="checkedPlan" @select="selectPatrol" :treeData="patrolPlanInfo"/> -->
                <a-collapse v-model="activeKey">
                  <a-collapse-panel header="黄浦江" key="1" style="text-align: left">
                    <p style="margin:0;">{{text}}</p>
                  </a-collapse-panel>
                  <a-collapse-panel header="鸭绿江" key="2" :disabled='false' style="text-align: left">
                    <p style="margin:0;">{{text}}</p>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </div>
          </div>
          <div v-if="nosuperKey === 'personCard'">
            <div class="super_weather">
              <img src="../../assets/weather.jpg" alt />
            </div>
            <div class="left_riverInfo">
              <a-tabs defaultActiveKey="1" @change="changeInfo">
                <a-tab-pane tab="水质数据" key="1">
                  <a-row class="rInfo_row">
                    <a-col :span="12">
                      <span class="rInfo_title">水体名称&nbsp;:</span>
                      <span class="rInfo_info">黄浦江</span>
                    </a-col>
                    <a-col :span="10" :offset="2">
                      <span class="rInfo_info">2019-8-22 13:00</span>
                    </a-col>
                  </a-row>
                  <a-row class="rInfo_row">
                    <a-col :span="12">
                      <span class="rInfo_title">断面名称&nbsp;:</span>
                      <span class="rInfo_info">黄浦江</span>
                    </a-col>
                  </a-row>
                </a-tab-pane>
                <a-tab-pane tab="河长信息" key="2">
                  
                </a-tab-pane>
              </a-tabs>
            </div>
          </div>
          <search-river ref="selectPatrol" class="riverSearchModal"></search-river>
          <add-survey ref="addSurvey" class="riverSearchModal"></add-survey>
        </div>
      </template>
      <template slot="paneR">
        <div class="right-info">
          <div class="right-body">
            <!-- 首页内容展示 -->
            <a-card :tabList="planList" :activeTabKey="noTitleKey" @tabChange="key => onTabChange(key,'noTitleKey')" v-if="firstShow">
              <!-- 新建计划 -->
              <div v-if="noTitleKey === 'addPlan'">
                <!-- 判断显示内容 -->
                <div v-if="ishidden == 1">
                  <a-row type="flex" justify="center" style="margin-bottom:15px;margin-top:15px;text-align:center;">
                    <a-col :span="12">
                      <a-button style="padding:0 22px;color:#1890ff;" @click="addRiverBtn">添加河道</a-button>
                    </a-col>
                    <a-col :span="12">
                      <a-button @click="$refs.addSurvey.show()" class="commBtn">添加调查点</a-button>
                    </a-col>
                  </a-row>
                  <div class="riverInfo">
                    <div class="river_info">
                      <span>黄浦江</span>
                      <a-select defaultValue="" @change="handleChange" style="width:160px;margin-left:20px;">
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                      </a-select>
                      <a-button class="delete_river" shape="circle" icon="close" style="top:14px;"></a-button>
                    </div>
                    <a-tree checkable defaultExpandAll v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData">
                    </a-tree>
                    <a-button class="addTask_btn commBtn" icon="plus" @click="addTaskBtn" v-show="cBtn">追加任务</a-button> 
                    <add-task ref="addTask" @showAddBtn="clearBtn"></add-task>
                  </div>
                  <div class="riverInfo">
                    <div class="river_info">
                      <span>专向调查点</span>
                      <a-button class="delete_river" shape="circle" icon="close"></a-button>
                    </div>
                    <a-tree checkable v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData">
                    </a-tree>
                    <a-button class="addTask_btn commBtn" icon="plus" @click="addTaskBtn" v-show="cBtn">追加任务</a-button> 
                  </div>   
                </div> 
                <div v-if="ishidden == 2">
                  <creat-group ref="creatGroup"></creat-group>
                </div>
                <div v-if="ishidden == 3">
                  <plan-list ref="planList"></plan-list>
                </div>
              </div>
              <!-- 今日计划 -->
              <div v-if="noTitleKey === 'nowPlan'">
                <a-collapse v-model="activePlanKey" class="active_plan">
                  <a-collapse-panel  key="1" class="collapse_header">
                    <template slot="header">
                      <span>计划一</span><a-progress :percent="70" class="plan_progress"/>
                    </template>
                    <div class="planGroup">
                      <a-collapse v-model="activeGroupKey">
                        <a-collapse-panel key="11" class="collapse_group">
                          <template slot="header">
                            <span>组一</span>
                            <a-progress :percent="75" class="group_progress"/>
                          </template>
                          <div class="river_group">
                            <a-collapse v-model="activeRiverKey" style="border-bottom:1px solid d9d9d9;">
                              <a-collapse-panel header="黄浦江" key="111" class="collapse_river">
                                <div style="padding:10px 10px;">
                                  <div>
                                    <div class="riverGroup_info">未完成</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                  <div class="">
                                    <div class="riverGroup_success">已完成</div>
                                    <!-- <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree> -->
                                    <!-- <a-tree @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData">
                                      <template slot="custom" slot-scope="item">
                                        <span>{{item.title}}</span>
                                        <a-button style="position:absolute;right:60px;">查看</a-button>
                                      </template>
                                    </a-tree> -->
                                    <a-tree :treeData="sutreeData" class="tree_succ">
                                        <template slot="custom" slot-scope="item">
                                          <span>{{ item.title }}</span>
                                          <a-button class="but_type" v-if="childNode" @click="()=> searchItme(item)">查看</a-button>
                                        </template>
                                      </a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_warning">异常</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                </div> 
                                <div class="addTaskBtn">
                                  <a-button class="addTask_btn" icon="plus" @click="addNewTask">追加任务</a-button>
                                </div>
                              </a-collapse-panel>
                            </a-collapse>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                      <a-collapse v-model="activeTwo">
                        <a-collapse-panel key="11" class="collapse_group">
                          <template slot="header">
                            <span>组二</span>
                            <a-progress :percent="75" class="plan_progress"/>
                          </template>
                          <div class="river_group">
                            <a-collapse v-model="activeTwo" style="background-color:#FFFFFF;border-bottom:1px solid d9d9d9;">
                              <a-collapse-panel header="黄浦江" key="111" class="collapse_river">
                                <div style="padding:10px 10px;">
                                  <div>
                                    <div class="riverGroup_info">未完成</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_success">已完成</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_warning">异常</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                </div> 
                                <div class="addTaskBtn">
                                  <a-button class="addTask_btn" icon="plus" @click="addNewTask">追加任务</a-button>
                                </div>
                              </a-collapse-panel>
                            </a-collapse>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                    </div>
                    <div class="btn_group">
                      <a-row type="flex" justify="space-around">
                        <a-col :span="10">
                          <a-button class="groupBtn" @click="detailPlan">详情</a-button>
                        </a-col>
                        <a-col :span="10">
                          <a-button class="groupBtn" @click="supervision_btn">监管</a-button>
                        </a-col>
                      </a-row>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </a-card>
            <a-card :tabList="superCard" :activeTabKey="nosuperKey" @tabChange="key => onsuperChange(key,'nosuperKey')" v-if="!firstShow">
              <div v-if="nosuperKey === 'taskCard'">
                <a-collapse v-model="activePlanKey" class="active_plan">
                  <a-collapse-panel  key="1" class="collapse_header">
                    <template slot="header">
                      <span>计划一</span><a-progress :percent="70" class="plan_progress"/>
                    </template>
                    <div class="planGroup">
                      <a-collapse v-model="activeGroupKey">
                        <a-collapse-panel key="11" class="collapse_group">
                          <template slot="header">
                            <span>组一</span>
                            <a-progress :percent="75" class="group_progress"/>
                          </template>
                          <div class="river_group">
                            <a-collapse v-model="activeRiverKey" style="border-bottom:1px solid d9d9d9;">
                              <a-collapse-panel header="黄浦江" key="111" class="collapse_river">
                                <div style="padding:10px 10px;">
                                  <div>
                                    <div class="riverGroup_info">未完成</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_success">已完成</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_warning">异常</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                </div> 
                                <div class="addTaskBtn">
                                  <a-button class="addTask_btn" icon="plus" @click="addNewTask">追加任务</a-button>
                                </div>
                              </a-collapse-panel>
                            </a-collapse>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                      <a-collapse v-model="activeTwo">
                        <a-collapse-panel key="11" class="collapse_group">
                          <template slot="header">
                            <span>组二</span>
                            <a-progress :percent="75" class="plan_progress"/>
                          </template>
                          <div class="river_group">
                            <a-collapse v-model="activeTwo" style="background-color:#FFFFFF;border-bottom:1px solid d9d9d9;">
                              <a-collapse-panel header="黄浦江" key="111" class="collapse_river">
                                <div style="padding:10px 10px;">
                                  <div>
                                    <div class="riverGroup_info">未完成</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_success">已完成</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                  <div>
                                    <div class="riverGroup_warning">异常</div>
                                    <a-tree v-model="checkedKeys" @select="onSelect" :selectedKeys="selectedKeys" :treeData="treeData"></a-tree>
                                  </div>
                                </div> 
                                <div class="addTaskBtn">
                                  <a-button class="addTask_btn" icon="plus" @click="addNewTask">追加任务</a-button>
                                </div>
                              </a-collapse-panel>
                            </a-collapse>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                    </div>
                    <div class="btn_group">
                      <a-button class="addTask_btn" @click="detailPlan">详情</a-button>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
              <div v-if="nosuperKey === 'personCard'">
                <a-collapse v-model="activePlanKey" class="active_plan">
                  <a-collapse-panel  key="1" class="collapse_header">
                    <template slot="header">
                      <span>计划一</span><a-progress :percent="70" class="plan_progress"/>
                    </template>
                    <div class="planGroup">
                      <a-collapse v-model="activeGroupKey">
                        <a-collapse-panel key="11" class="collapse_group">
                          <template slot="header">
                            <span>组一</span>
                            <a-progress :percent="75" class="group_progress"/>
                          </template>
                          <div class="plan_personInfo">
                            <a-list bordered :dataSource="personInfo">
                              <a-list-item slot="renderItem" slot-scope="item,index">   
                                <a slot="actions" syle="width:10px;height:10px;border-radius:50%;background-color:green;"></a>
                                <!-- <a-list-item-meta> -->
                                  {{item.name}}&nbsp;({{item.position}})
                                <!-- </a-list-item-meta> -->
                                <!-- <div><span style="border-radius:50%;background-color:green;"></span></div> -->
                              </a-list-item>
                            </a-list>
                          </div>
                        </a-collapse-panel>
                      </a-collapse>
                    </div>
                  </a-collapse-panel>
                </a-collapse>
              </div>
            </a-card>
          </div>
          <!-- 底部 -->
          <div class="addPlan_foot" v-if="noTitleKey === 'addPlan'">
            <div v-if="ishidden == 1">
              <a-row type="flex" justify="space-around">
                <a-col :span="10">
                  <a-button class="groupBtn" @click="newPlan_btn">生成计划</a-button>
                </a-col>
                <a-col :span="10">
                  <a-button class="groupBtn">加入已有计划</a-button>
                </a-col>
              </a-row>
              <!-- <span @click="newPlan_btn">生成计划</span>
              <span>加入已有计划</span> -->
            </div>  
            <div v-if="ishidden == 2">
              <span @click="canclePlanBtn">取消</span>
              <span @click="showPlanBtn">下一步</span>
            </div> 
            <div v-if="ishidden == 3">
              <span @click="previousBtn">上一步</span>
              <span @click="reHome">返回首页</span>
            </div>
          </div>
        </div>
      </template>
    </split-pane>
  </div>
</template>

<script>
import '../../assets/css/monitor.less'
import searchRiver from '../modals/searchRiver'
import addTask from '../modals/addTask'
import creatGroup from '../modals/creatGroup'
import planList from '../modals/planList'
import addSurvey from '../modals/addSurvey'
import addNewTask from '../modals/addNewTask'
import planDetail from '../modals/planDetail'
import { BreadcrumbItem } from 'iview'

const sutreeData = [
  {
    title: '0-0',
    key: '0-0',
    scopedSlots: { title: 'custom' },
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        scopedSlots: { title: 'custom' },
        children: [
          { title: '0-0-0-0', key: '0-0-0-0', scopedSlots: { title: 'custom' } },
          { title: '0-0-0-1', key: '0-0-0-1', scopedSlots: { title: 'custom' } },
          { title: '0-0-0-2', key: '0-0-0-2', scopedSlots: { title: 'custom' } }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        scopedSlots: { title: 'custom' },
        children: [
          { title: '0-0-1-0', key: '0-0-1-0', scopedSlots: { title: 'custom' } },
          { title: '0-0-1-1', key: '0-0-1-1', scopedSlots: { title: 'custom' } },
          { title: '0-0-1-2', key: '0-0-1-2', scopedSlots: { title: 'custom' } }
        ]
      },
      {
        title: '0-0-2',
        key: '0-0-2',
        scopedSlots: { title: 'custom' }
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    scopedSlots: { title: 'custom' },
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', scopedSlots: { title: 'custom' } },
      { title: '0-1-0-1', key: '0-1-0-1', scopedSlots: { title: 'custom' } },
      { title: '0-1-0-2', key: '0-1-0-2', scopedSlots: { title: 'custom' } }
    ]
  },
  {
    title: '0-2',
    key: '0-2',
    scopedSlots: { title: 'custom' }
  }
]

const treeData = [
  {
    title: '无人机正射影像',
    key: '0-0'
  },
  {
    title: '360全景图',
    key: '0-1',
    children: [{ title: '黄浦江360(一)', key: '0-1-0-0' }, { title: '黄浦江360(二)', key: '0-1-0-1' }]
  }
]

const personInfo = [
  {
    name: '张三',
    position: '飞手'
  },
  {
    name: '李四',
    position: '调查员'
  },
  {
    name: '王五',
    position: '司机'
  }
]
export default {
  name: 'Analysis',
  components: {
    searchRiver,
    addTask,
    creatGroup,
    planList,
    addSurvey,
    addNewTask,
    planDetail
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
      superCard: [
        {
          key: 'taskCard',
          tab: '任务'
        },
        {
          key: 'personCard',
          tab: '轨迹'
        }
      ],
      noTitleKey: 'addPlan',
      nosuperKey: 'taskCard',
      checkedKeys: ['0-1-0-0'],
      selectedKeys: [],
      treeData,
      sutreeData,
      ishidden: 1,
      checkedPlan: [],
      cBtn: true,
      activePlanKey: ['1'],
      activeGroupKey: ['11'],
      activeRiverKey: ['111'],
      activeKey: ['1'],
      activeTwo: [],
      personInfo,
      text: '当前河道方位内出现红色风险源',
      // 地图对象
      map: {},
      // 地图节点对象（里面含节点对象、区域对象、任务弹窗对象）
      mapPoint: new Map(),
      firstShow: true,
      childNode: false,
      patrolPlanInfo: [
        {
          title: '黄浦江',
          key: '1',
          children: [{ title: '当前河道方位内出现红色风险源,推荐加入巡查计划', key: '1' }]
        },
        {
          title: '鸭绿江',
          key: '2',
          children: [
            {
              title: '当前河道预设任务完成度滞后！其中360未完成3个、正射影像线路：A1+B2+C3未执行，推荐加入调查计划',
              key: '2'
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
  mounted() {
    this.initCruisePlan()
  },
  methods: {
    initCruisePlan() {
      const that = this
      //初始化地图控件
      let zoom = 14
      that.map = new T.Map('map')
      that.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      // this.map.TileLayerOptions({zIndex: 1});

      // 初始化天气插件
      /*        let a = d.getElementById('weather-float-he')
        if (a) {
          a.parentNode.removeChild(a)
        }
        a = d.createElement('div')
        a.id = 'weather-float-he'
        let b = d.getElementsByTagName('body')[0]
        b.appendChild(a);
        let c = d.createElement('link')
        c.rel = 'stylesheet'
        c.href = 'https://apip.weatherdt.com/float/static/css/tqw_widget_float.css?v=0101'
        let s = d.createElement('script')
        s.src = 'https://apip.weatherdt.com/float/static/js/tqw_widget_float.js?v=0101'
        let sn = d.getElementsByTagName('script')[0]
        sn.parentNode.insertBefore(c, sn)
        sn.parentNode.insertBefore(s, sn);*/
    },
    //选中添加河道或今日计划面板
    onTabChange(key, type) {
      console.log(key, type)
      this[type] = key
      if (key == 'nowPlan') {
        // console.log("已完成" + this.sutreeData)
        let sutree = this.sutreeData
        // this.diguiTree(sutree)
        for (var j = 0; j < sutreeData.length; j++) {
          this.diguiTree(sutreeData[j])
        }
      }
    },
    diguiTree(item) {
      //没有children了，所以是叶子节点
      console.log(item)
      //debugger;
      if (item.children == null) {
        console.log('叶子节点：', item)
        this.childNode = true
        return
      }
      //不是叶子节点，所以继续循环递归
      for (var i = 0; i < item.children.length; i++) {
        this.diguiTree(item.children[i])
      }

      // for (let i in item){
      //   if(item[i].children == null){
      //     this.childNode=true;
      //     return;
      //   }else{
      //     console.log(item[i].children)
      //     this.diguiTree(item[i].children)
      //   }
      // }
    },
    onsuperChange(key, type) {
      console.log(key, type)
      this[type] = key
    },
    //选中添加河道
    addRiverBtn() {
      this.$refs.selectPatrol.show()
    },
    //右侧模块选择框修改
    handleChange() {},
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
      this.$refs.addTask.show()
      this.cBtn = false
    },
    clearBtn(val) {
      console.log('............' + val)
      this.cBtn = val
    },
    //生成计划
    newPlan_btn() {
      this.ishidden = 2
    },
    // getHidden(val){
    //   console.log(val);
    //   this.ishidden = val;
    // },
    canclePlanBtn() {
      this.ishidden = 1
    },
    showPlanBtn() {
      this.ishidden = 3
    },
    previousBtn() {
      this.ishidden = 2
    },
    reHome() {
      this.ishidden = 1
    },
    //今日计划中组点击
    selectGroup() {},
    //当日计划模块追加任务
    addNewTask() {
      this.$refs.addNewTask.showtask()
    },
    //当日计划模块详情按钮
    detailPlan() {
      this.$refs.planDetail.show()
    },
    //今日计划模块监管按钮
    supervision_btn() {
      console.log('今日计划')
      console.log(this.firstShow)
      this.firstShow = !this.firstShow
      console.log(this.firstShow)
    },
    changeInfo(key) {
      console.log(key)
    },
    searchItme(val) {
      console.log('选中查看按钮' + val)
    }
  }
}
</script>

<style scoped>
.splitter-pane splitter-paneL vertical {
  width: 72%;
}
.splitter-pane-resizer vertical {
  left: 72%;
}
.splitter-pane splitter-paneR vertical {
  width: 28%;
}
</style>
