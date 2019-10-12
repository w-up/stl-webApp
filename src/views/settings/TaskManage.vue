<template>
  <div class="supervise">
    <!-- 任务管理 -->
    <div class="left">
      <div id="map" ref="worldMap"></div>
      <!-- <world-map></world-map> -->
      <div class="mapChange">
        <a-row style="width:100%">
          <a-col :span="24">
            <a-checkbox @change="mapChooseItem">水质监测点</a-checkbox>
          </a-col>
          <a-col :span="24">
            <a-checkbox @change="mapChooseItem">风险源</a-checkbox>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="right">
      <a-tabs defaultActiveKey="1" @change="callback" v-model="actionTab" class="custom_tabs">
        <a-tab-pane tab="线路任务" key="1">
          <section class="task_face">
            <a-list
              size="small"
              bordered
              :dataSource="lineTaskList"
              style="margin-top: 10px;"
              v-show="!addLineShow"
            >
              <a-list-item
                slot="renderItem"
                slot-scope="item, index"
                :key="index"
                @click="chooseLineTask(item.name)"
                :class="{active_item: item.clicked}"
              >
                <a-row style="width:100%">
                  <a-col :span="20">{{item.name}}</a-col>
                  <a-col :span="4" style="text-align:right;">
                    <a-popconfirm
                      title="确定要删除吗?"
                      @confirm="confirmDelete(item.name)"
                      @cancel="cancelDelete"
                      okText="确定"
                      cancelText="取消"
                    >
                      <a href="#">删除</a>
                    </a-popconfirm>
                  </a-col>
                </a-row>
              </a-list-item>
            </a-list>
            <a-form v-show="addLineShow" style="width: 100%;">
              <a-form-item
                label="任务名称"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务名称" />
              </a-form-item>
              <a-form-item
                label="任务内容"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务内容" />
              </a-form-item>
              <a-form-item
                label="月计划次数"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入月计划次数" />
              </a-form-item>
              <a-form-item
                label="涉及线路"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-upload
                  name="file"
                  :multiple="true"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :headers="headers"
                  @change="handleUpload"
                >
                  <a-button>
                    <a-icon type="upload" />上传KMZ文件
                  </a-button>
                </a-upload>
              </a-form-item>
              <a-form-item
                label="高度(m)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入高度" />
              </a-form-item>
              <a-form-item
                label="长度(m)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入长度" />
              </a-form-item>
              <a-form-item
                label="时长(min)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入时长" />
              </a-form-item>
              <a-form-item
                label="速度(km/h)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入速度" />
              </a-form-item>
              <a-form-item
                label="任务模板"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-select defaultValue="无人机" style="width: 100%">
                  <a-select-option value="无人机">无人机</a-select-option>
                  <a-select-option value="人工调查">人工调查</a-select-option>
                  <a-select-option value="水质调查">水质调查</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="关联河道"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-select
                  showSearch
                  :allowClear="true"
                  placeholder="请输入河流添加"
                  optionFilterProp="children"
                  style="width: 100%"
                  @change="handleChange"
                  :filterOption="filterOption"
                  v-model="defaultRiver"
                >
                  <a-select-option
                    :value="item.name"
                    v-for="(item, index) in riverList"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="人员配置"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-row style="width:100%">
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">主飞手</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">副飞手</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">采水员</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="设备配置"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              ></a-form-item>
              <a-collapse size="small" style="margin-top:10px;" :bordered="false">
                <a-collapse-panel :style="customStyle">
                  <template slot="header">
                    <a-checkbox @change.stop="peopleChoose">无人机设备</a-checkbox>
                  </template>
                  <a-row style="width:100%">
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机主机</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机机翼</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机电池</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                  </a-row>
                </a-collapse-panel>
                <a-collapse-panel :style="customStyle">
                  <template slot="header" @change.stop="peopleChoose">
                    <a-checkbox >采水设备</a-checkbox>
                  </template>
                  <a-row style="width:100%">
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">容器</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">手套</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">试纸</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                  </a-row>
                </a-collapse-panel>
              </a-collapse>
              <a-form-item
                label="备注"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入备注" />
              </a-form-item>
              <a-form-item
                label="人员职责"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入人员职责" />
              </a-form-item>
            </a-form>
          </section>
        </a-tab-pane>
        <a-tab-pane tab="点任务" key="2" forceRender>
          <section class="task_face">
            <a-directory-tree
              multiple
              defaultExpandAll
              @select="onSelect"
              @expand="onExpand"
              :treeData="treeData"
              v-show="!addPointShow"
            ></a-directory-tree>
            <a-form v-show="addPointShow" style="width: 100%;">
              <a-form-item
                label="任务名称"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务名称" />
              </a-form-item>
              <a-form-item
                label="任务内容"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-textarea :autosize="{ minRows: 2, maxRows: 6 }" />
              </a-form-item>
              <a-form-item
                label="任务高度"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务高度" />
              </a-form-item>
              <a-form-item
                label="任务时长(min)"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务时长" />
              </a-form-item>
              <a-form-item
                label="备注"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-textarea placeholder="请输入备注信息" :autosize="{ minRows: 2, maxRows: 6 }" />
              </a-form-item>
              <a-form-item
                label="任务职责"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input placeholder="请输入任务职责" />
              </a-form-item>
              <a-form-item
                label="任务模板"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-select placeholder="请选择" style="width: 100%">
                  <a-select-option value="无人机">无人机</a-select-option>
                  <a-select-option value="人工调查">人工调查</a-select-option>
                  <a-select-option value="水质调查">水质调查</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="人员配置"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-row style="width:100%">
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">主飞手</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">副飞手</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                  <a-col :span="14" style="height:30px;">
                    <a-checkbox @change="peopleChoose">采水员</a-checkbox>
                  </a-col>
                  <a-col :span="10" style="height:30px;text-align:right;">
                    <a-input-number
                      size="small"
                      :min="1"
                      :max="100000"
                      :defaultValue="1"
                      @change="peopleNum"
                      style="width: 70px;"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item
                label="设备配置"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              ></a-form-item>
              <a-collapse size="small" style="margin-top:10px;" :bordered="false">
                <a-collapse-panel :style="customStyle">
                  <template slot="header">
                    <a-checkbox @change.stop="peopleChoose">无人机设备</a-checkbox>
                  </template>
                  <a-row style="width:100%">
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机主机</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机机翼</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">无人机电池</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                  </a-row>
                </a-collapse-panel>
                <a-collapse-panel :style="customStyle">
                  <template slot="header">
                    <a-checkbox @change="peopleChoose">采水设备</a-checkbox>
                  </template>
                  <a-row style="width:100%">
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">容器</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">手套</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                    <a-col :span="12" offset="4" style="height:30px;">
                      <a-checkbox @change="peopleChoose">试纸</a-checkbox>
                    </a-col>
                    <a-col :span="8" style="height:30px;text-align:right;">
                      <a-input-number
                        size="small"
                        :min="1"
                        :max="100000"
                        :defaultValue="1"
                        @change="peopleNum"
                        style="width: 70px;"
                      />
                    </a-col>
                  </a-row>
                </a-collapse-panel>
              </a-collapse>
            </a-form>
          </section>
        </a-tab-pane>
      </a-tabs>
      <a-button
        type="primary"
        block
        class="bottom_add"
        @click="addTask"
        v-show="(actionTab==1 && !addLineShow) || (actionTab==2 && !addPointShow)"
      >{{actionTab==1?"添加线路任务":"添加点任务"}}</a-button>
      <!-- 线路任务按钮 -->
      <a-row
        v-show="(actionTab==1 && addLineShow) || (actionTab==2 && addPointShow)"
        style="width:100%;"
        class="bottom_add"
        type="flex"
        justify="space-around"
        align="middle"
      >
        <a-col :span="6">
          <a-button type="primary" block @click="taskCancel">取消</a-button>
        </a-col>
        <a-col :span="6">
          <a-button type="primary" block @click="taskSave">保存</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 添加河流 -->
    <add-task-point ref="addTaskPoint"></add-task-point>
  </div>
</template>

<script>
// import WorldMap from "../../components/map/WorldMap.vue";
import AddTaskPoint from './modules/AddTaskPoint.vue'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const treeData = [
  {
    title: '360',
    key: '0-0',
    children: [
      {
        title: '坐标点1',
        key: '0-0-0'
      },
      {
        title: '坐标点2',
        key: '0-0-1'
      },
      {
        title: '坐标点3',
        key: '0-0-2'
      }
    ]
  },
  {
    title: '人工调查点',
    key: '0-1',
    children: [
      { title: '坐标点1', key: '0-1-0-0' },
      { title: '坐标点2', key: '0-1-0-1' },
      { title: '坐标点3', key: '0-1-0-2' }
    ]
  }
]
export default {
  name: 'TaskManage',
  components: {
    // 'world-map': WorldMap
    'add-task-point': AddTaskPoint
  },
  data() {
    return {
      headers: {
        //上传
        authorization: 'authorization-text'
      },
      addRiverShow: false, // 气泡卡片
      actionTab: '1', //tab

      lineTaskList: [
        {
          id: 0,
          name: '无人机正射影像',
          clicked: true
        },
        {
          id: 1,
          name: '无人机倾斜影像',
          clicked: false
        },
        {
          id: 2,
          name: '无人机人工拍照',
          clicked: false
        }
      ],
      addRiverShow: false,
      addLineShow: false, // 线路任务显示
      addPointShow: false, // 点任务显示
      // 添加线路任务
      checkNick: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this),

      defaultRiver: '黄浦江',
      riverList: [
        {
          id: 0,
          name: '黄浦江',
          clicked: true
        },
        {
          id: 1,
          name: '大治河',
          clicked: false
        },
        {
          id: 2,
          name: '川杨河',
          clicked: false
        },
        {
          id: 3,
          name: '蕰藻浜',
          clicked: false
        },
        {
          id: 4,
          name: '龙华港',
          clicked: false
        },
        {
          id: 5,
          name: '太浦河',
          clicked: false
        },
        {
          id: 6,
          name: '太湖',
          clicked: false
        }
      ],

      customStyle: 'background: #fff;margin: 0;overflow: hidden', // 折叠面板样式

      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      treeData,

      // 地图对象
      map: {},
      // 地图节点对象（里面含节点对象、区域对象、任务弹窗对象）
      mapPoint: new Map(),
      markerTool: '' // 点任务工具
    }
  },
  mounted() {
    this.initCruisePlan()
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  methods: {
    initCruisePlan() {
      //初始化地图控件
      let zoom = 14
      this.map = new T.Map('map')
      this.map.centerAndZoom(new T.LngLat(121.495505, 31.21098), zoom)
      this.markerTool = new T.MarkTool(this.map, { follow: true })
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
    // 上传文件
    handleUpload(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    // 注册事件
    // 注册添加点击事件
    addTaskPoint() {
      // this.removeMapClick()
      // this.map.addEventListener('click', this.MapClick)

      this.markerTool.open()
      this.markerTool.getMarkers()
      for (var i = 0; i < this.markerTool.length; i++) {
        this.markerTool[i].disableDragging()
      }
      this.markerTool.addEventListener("mouseup", this.addTaskPointed)
    },
    // 返回标注点的坐标
    addTaskPointed(e) {
      console.log(e);
      // console.log(this.markerTool.getMarkControlPoint());
    },
    // 地图点击事件
    MapClick(e) {
      const postion = []
      const that = this
      let icon = new T.Icon({
        iconUrl: 'http://api.tianditu.gov.cn/img/map/markerA.png',
        iconSize: new T.Point(19, 27),
        iconAnchor: new T.Point(10, 25)
      })
      //向地图上添加自定义标注
      // let marker = new T.Marker(new T.LngLat(postion), {icon: icon});
      let marker = new T.Marker(new T.LngLat(e.lnglat.lng, e.lnglat.lat), { icon: icon, title: "点击选择任务点" })
      this.map.addOverLay(marker)
      //向地图上添加圆
      let circle = new T.Circle(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 1000, {
        color: 'blue',
        weight: 2,
        opacity: 0.5,
        fillColor: '#FFFFFF',
        fillOpacity: 0.5,
        lineStyle: 'solid'
      })
      // this.map.addOverLay(circle)

      // 添加文字标注
      let labeName = '任务点' + (this.mapPoint.size + 1)
      let label = new T.Label({
        text: `<b style="border-radius: 3px">${labeName}<b>`,
        position: marker.getLngLat(),
        offset: new T.Point(-56, 20)
      })
      // this.map.addOverLay(label)

      // 向mapPoint对象添加节点
      let mapPointChild = { marker: marker, circle: circle, label: label }
      this.mapPoint.set(labeName, mapPointChild)

      // 向地图注册标注点击事件
      //移除标注的点击事件，防止多次注册
      removeMarkerClick()
      //注册标注的点击事件
      marker.addEventListener('click', MarkerClick)

      function removeMarkerClick() {
        //移除标注的点击事件
        marker.removeEventListener('click', MarkerClick)
      }

      function MarkerClick(e) {
        console.log('这是标注点击事件' + e)
        console.log(e)
        //设置显示地图的中心点和级别
        // that.map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat));
        that.map.centerAndZoom(new T.LngLat(e.lnglat.lng + 0.01, e.lnglat.lat))
      }
    },
    // 地图删除事件
    removeMapClick() {
      this.map.removeEventListener('click', this.MapClick)
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    // 弹窗点击确认事件
    modalClick(v) {
      this[v].click()
    },
    //右侧菜单列表追加任务
    additionalTask(o) {},
    // 打开弹窗
    openPopup(v) {
      this.transferAttribute = this[v]
      this.transferAttribute.visible = true
    },
    // 添加任务点
    addTaskPointAlert() {
      this.$refs.addTaskPoint.add()
    },
    // tab切换
    callback(key) {
      console.log(key)
    },
    // 树形图
    onSelect(keys) {
      console.log('Trigger Select', keys)
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    // 地图选项
    mapChooseItem(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    // 线路任务
    chooseLineTask(index) {
      this.defaultRiver = index
      this.lineTaskList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
        } else {
          value.clicked = false
        }
      })
    },
    // 线路任务删除
    confirmDelete(index) {
      this.lineTaskList.splice(this.lineTaskList.findIndex(item => item.name === index), 1)
      this.$message.success('删除成功')
      this.defaultRiver = null
    },
    cancelDelete(e) {
      // this.$message.error('Click on No')
    },
    // 线路人员选择
    peopleChoose(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    // 线路人员配置人数
    peopleNum(value) {
      console.log('changed', value)
    },
    // 线路任务添加
    check() {
      this.form.validateFields(err => {
        if (!err) {
          console.info('success')
        }
      })
    },
    handleChange(e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    },
    // 添加任务按钮
    addTask() {
      if (this.actionTab == 1) {
        this.addLineShow = true
      } else if (this.actionTab == 2) {
        this.addPointShow = true
        this.addTaskPoint()
      }
    },
    // 关联河道
    handleChange(index) {
      console.log(`selected ${index}`)
      this.riverList.forEach(value => {
        if (value.name === index) {
          value.clicked = true
        } else {
          value.clicked = false
        }
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    // 线路任务按钮
    taskCancel() {
      if (this.actionTab == 1) {
        this.addLineShow = false
      } else if (this.actionTab == 2) {
        this.addPointShow = false
      }
    },
    taskSave() {
      if (this.actionTab == 1) {
        this.addLineShow = false
      } else if (this.actionTab == 2) {
        this.addPointShow = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.supervise {
  position: relative;
  height: calc(100vh - 64px);
  width: 100vw;
}
#map {
  width: 100%;
  height: 100%;
}
.mapChange {
  position: fixed;
  left: 10px;
  bottom: 10px;
  width: 120px;
  z-index: 1500;
}

.left {
  position: relative;
  width: calc(100% - 300px);
  height: 100%;
  display: inline-block;
  vertical-align: top;
}
.right {
  position: relative;
  width: 300px;
  height: 100%;
  display: inline-block;
  vertical-align: top;
  padding: 10px;
  background-color: white;
}
.task_face {
  width: 100%;
  height: calc(100vh - 180px);
  overflow: auto;
}

.ant-spin-container {
  .ant-list-item:hover {
    background-color: #eee;
  }
  .active_item {
    background-color: #eee;
  }
}
.ant-form-item {
  margin-bottom: 0;
}

.bottom_add {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  margin: auto;
  width: 60%;
}
</style>
